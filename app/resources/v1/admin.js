import jwt from 'jsonwebtoken'
import logger from '../../lib/logger.js'
import models from '../../db/models/index.js'

const { User, Element, PavementStructure } = models

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key' // Use a strong secret in production
const JWT_EXPIRES_IN_MS = 60 * 60 * 1000 * 24 // 24 hours in ms

export async function adminSignIn (req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' })
    }

    // find from database user table
    const user = await User.findOne({
      where: { email, password }
    })

    // Simple check against hardcoded admin user
    if (email === user?.email && password === user?.password) {
      const userData = {
        id: user?.id,
        displayName: user.displayName,
        email: user?.email,
        roles: user?.roles
      }

      const token = jwt.sign(userData, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN_MS,
        algorithm: 'HS256'
      })
      logger.info(`Admin user ${email} signed in.`)
      // set cookie
      const cookieOptions = {
        maxAge: 9000000000,
        sameSite: 'strict'
      }

      res.cookie('user_id', user.id, cookieOptions)
      res.cookie('admin_login_token', token, cookieOptions)

      return res.status(200).json({ user: userData })
    } else {
      logger.warn(`Failed admin sign in attempt for email: ${email}`)
      return res.status(401).json({ error: 'Invalid credentials.' })
    }
  } catch (error) {
    return res.status(401).json({ error: 'Invalid credentials.' })
  }
}

export const getAllElementData = async (req, res) => {
  try {
    const elements = await Element.findAll()
    res.status(200).json({ elements })
  } catch (error) {
    res.status(500).json({ error: 'Failed to get element data.' })
  }
}

export const getAllPavementStructureData = async (req, res) => {
  try {
    const pavementStructure = await PavementStructure.findAll()
    res.status(200).json({ pavementStructure })
  } catch (error) {
    res.status(500).json({ error: 'Failed to get pavement structure data.' })
  }
}

export const saveElementData = async (req, res) => {
  try {
    const { elements } = req.body
    // Update elements in database from id
    const updatedElements = elements.forEach((element) => {
      Element.update(
        {
          countEur: element.countEur,
          countCo2: element.countCo2,
          sur30CountEur: element.sur30CountEur,
          sur30CountCo2: element.sur30CountCo2
        },
        { where: { id: element.id } }
      )
    })
    res.status(200).json({ elements: updatedElements })
  } catch (error) {
    res.status(500).json({ error: 'Failed to save element data.' })
  }
}

export const savePavementStructureData = async (req, res) => {
  try {
    const { pavementStructure } = req.body
    // Update pavementStructure in database from id
    const updatedPavementStructure = pavementStructure.forEach(
      (pavementStructure) => {
        PavementStructure.update(
          {
            prixProjet: pavementStructure.prixProjet,
            co2Projet: pavementStructure.co2Projet,
            prixSur30Ans: pavementStructure.prixSur30Ans,
            co2Sur30Ans: pavementStructure.co2Sur30Ans
          },
          { where: { id: pavementStructure.id } }
        )
      }
    )
    res.status(200).json({ pavementStructure: updatedPavementStructure })
  } catch (error) {
    res.status(500).json({ error: 'Failed to save pavement structure data.' })
  }
}

export const updateAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ error: 'All password fields are required.' })
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ error: 'New password and confirm password do not match.' })
    }

    // Get the admin user from the JWT token
    const adminUser = req.auth
    if (!adminUser || !adminUser.id) {
      return res.status(401).json({ error: 'Unauthorized access.' })
    }

    // Find the user in the database
    const user = await User.findOne({
      where: { id: adminUser.id }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }

    // Verify current password
    if (user.password !== currentPassword) {
      return res.status(401).json({ error: 'Current password is incorrect.' })
    }

    // Update the password
    await User.update({ password: newPassword }, { where: { id: user.id } })

    logger.info(`Admin user ${user.email} updated their password.`)
    res.status(200).json({ message: 'Password updated successfully.' })
  } catch (error) {
    logger.error('Error updating admin password:', error)
    res.status(500).json({ error: 'Failed to update password.' })
  }
}
