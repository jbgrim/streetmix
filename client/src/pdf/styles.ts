import { StyleSheet } from '@react-pdf/renderer'

export const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontSize: '11pt'
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: 30
  },
  project: {
    border: '1px solid black',
    padding: 10
  },
  logo: {
    width: 80
  },
  mainContainer: {
    marginHorizontal: 50,
    marginVertical: 30
  },
  title: {
    fontSize: '16pt',
    fontWeight: 'bold',
    color: '#FF7D0B',
    marginBottom: 5,
    marginTop: 10
  },
  subtitle: {
    fontSize: '11pt',
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#8685BB',
    marginBottom: 3,
    marginTop: 6
  },
  table: {
    borderBottom: '1px solid black',
    borderRight: '1px solid black'
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  tableCell: {
    borderTop: '1px solid black',
    borderLeft: '1px solid black',
    padding: '3px',
    textAlign: 'center'
  }
})
