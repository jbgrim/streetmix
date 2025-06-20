'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('PavementStructure', [
      {
        nom: 'Arbre',
        prix_projet: '100',
        co2_projet: '9.0',
        prix_sur_30_ans: '100',
        co2_sur_30_ans: '9.0',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'Candélabre 6m',
        prix_projet: '170',
        co2_projet: '54.4',
        prix_sur_30_ans: '255',
        co2_sur_30_ans: '81.6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'Candélabre 8m',
        prix_projet: '170',
        co2_projet: '41.4',
        prix_sur_30_ans: '255',
        co2_sur_30_ans: '62.0',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'T2 Granit',
        prix_projet: '50',
        co2_projet: '7.6',
        prix_sur_30_ans: '50',
        co2_sur_30_ans: '7.6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'T2 Béton',
        prix_projet: '25',
        co2_projet: '14.5',
        prix_sur_30_ans: '25',
        co2_sur_30_ans: '14.5',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'A2 Béton',
        prix_projet: '22',
        co2_projet: '11.7',
        prix_sur_30_ans: '22',
        co2_sur_30_ans: '11.7',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'P1 Béton',
        prix_projet: '16',
        co2_projet: '7.2',
        prix_sur_30_ans: '16',
        co2_sur_30_ans: '7.2',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'CS1 Béton',
        prix_projet: '38',
        co2_projet: '9.5',
        prix_sur_30_ans: '38',
        co2_sur_30_ans: '9.5',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'CS1 Granit',
        prix_projet: '40',
        co2_projet: '5.2',
        prix_sur_30_ans: '40',
        co2_sur_30_ans: '5.2',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'CS1 Pavé béton',
        prix_projet: '40',
        co2_projet: '4.0',
        prix_sur_30_ans: '80',
        co2_sur_30_ans: '7.9',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'CC1 Béton',
        prix_projet: '30',
        co2_projet: '13.5',
        prix_sur_30_ans: '60',
        co2_sur_30_ans: '27.0',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'DBA Béton',
        prix_projet: '120',
        co2_projet: '41.7',
        prix_sur_30_ans: '120',
        co2_sur_30_ans: '41.7',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'Pavé granit - 10cm',
        prix_projet: '120',
        co2_projet: '16.6',
        prix_sur_30_ans: '144',
        co2_sur_30_ans: '19.9',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'Pavé béton - 10cm',
        prix_projet: '55',
        co2_projet: '16.4',
        prix_sur_30_ans: '83',
        co2_sur_30_ans: '24.6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'Pavé joint gazon - 12cm',
        prix_projet: '45',
        co2_projet: '16.4',
        prix_sur_30_ans: '90',
        co2_sur_30_ans: '32.9',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'BBSG 20% AE - 4cm',
        prix_projet: '13',
        co2_projet: '5.4',
        prix_sur_30_ans: '39',
        co2_sur_30_ans: '16.1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'BBSG 20% AE - 5cm',
        prix_projet: '12',
        co2_projet: '6.4',
        prix_sur_30_ans: '36',
        co2_sur_30_ans: '19.1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'BBSG 20% AE - 6cm',
        prix_projet: '11',
        co2_projet: '7.2',
        prix_sur_30_ans: '33',
        co2_sur_30_ans: '21.7',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'Enrobé à froid - 6cm',
        prix_projet: '32',
        co2_projet: '5.9',
        prix_sur_30_ans: '96',
        co2_sur_30_ans: '17.7',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'Enrobé grenaillé - 6cm',
        prix_projet: '20',
        co2_projet: '7.3',
        prix_sur_30_ans: '60',
        co2_sur_30_ans: '21.9',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'BC5 - 16cm',
        prix_projet: '32',
        co2_projet: '38.0',
        prix_sur_30_ans: '48',
        co2_sur_30_ans: '57.0',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'BC5 - 18cm',
        prix_projet: '36',
        co2_projet: '42.6',
        prix_sur_30_ans: '54',
        co2_sur_30_ans: '63.9',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'BC5 - 20cm',
        prix_projet: '40',
        co2_projet: '47.3',
        prix_sur_30_ans: '60',
        co2_sur_30_ans: '70.9',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'BC5 - 21cm',
        prix_projet: '42',
        co2_projet: '49.6',
        prix_sur_30_ans: '63',
        co2_sur_30_ans: '74.5',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'BC5 - 22cm',
        prix_projet: '44',
        co2_projet: '51.9',
        prix_sur_30_ans: '66',
        co2_sur_30_ans: '77.9',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'BC5 - 23cm',
        prix_projet: '46',
        co2_projet: '54.2',
        prix_sur_30_ans: '69',
        co2_sur_30_ans: '81.3',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'BC5 - 24cm',
        prix_projet: '48',
        co2_projet: '56.6',
        prix_sur_30_ans: '72',
        co2_sur_30_ans: '84.9',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'Asphalte - 3cm',
        prix_projet: '38',
        co2_projet: '6.9',
        prix_sur_30_ans: '57',
        co2_sur_30_ans: '10.3',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'Sablé - 6cm',
        prix_projet: '12',
        co2_projet: '9.5',
        prix_sur_30_ans: '51',
        co2_sur_30_ans: '40.7',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'Sablé - 8cm',
        prix_projet: '14',
        co2_projet: '11.3',
        prix_sur_30_ans: '60',
        co2_sur_30_ans: '48.6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'Noue',
        prix_projet: '20',
        co2_projet: '6.6',
        prix_sur_30_ans: '60',
        co2_sur_30_ans: '19.7',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'GB3 - 8cm',
        prix_projet: '15',
        co2_projet: '9.3',
        prix_sur_30_ans: '22',
        co2_sur_30_ans: '13.9',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'GB3 - 9cm',
        prix_projet: '15',
        co2_projet: '10.2',
        prix_sur_30_ans: '23',
        co2_sur_30_ans: '15.2',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'GB3 - 10cm',
        prix_projet: '16',
        co2_projet: '11.1',
        prix_sur_30_ans: '23',
        co2_sur_30_ans: '16.7',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'GB3 - 11cm',
        prix_projet: '16',
        co2_projet: '12.0',
        prix_sur_30_ans: '24',
        co2_sur_30_ans: '18.0',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'GB3 - 12cm',
        prix_projet: '17',
        co2_projet: '12.9',
        prix_sur_30_ans: '25',
        co2_sur_30_ans: '19.3',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'GB3 - 14cm',
        prix_projet: '18',
        co2_projet: '14.7',
        prix_sur_30_ans: '26',
        co2_sur_30_ans: '22.1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'GB3 - 16cm',
        prix_projet: '19',
        co2_projet: '16.6',
        prix_sur_30_ans: '28',
        co2_sur_30_ans: '24.9',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'GB3 - 17cm',
        prix_projet: '19',
        co2_projet: '17.5',
        prix_sur_30_ans: '29',
        co2_sur_30_ans: '26.2',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'GB3 - 20cm',
        prix_projet: '21',
        co2_projet: '20.1',
        prix_sur_30_ans: '31',
        co2_sur_30_ans: '30.2',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'GB3 - 22cm',
        prix_projet: '22',
        co2_projet: '22.0',
        prix_sur_30_ans: '32',
        co2_sur_30_ans: '32.9',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'GB3 - 23cm',
        prix_projet: '22',
        co2_projet: '22.8',
        prix_sur_30_ans: '33',
        co2_sur_30_ans: '34.3',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'BC5 - 12cm',
        prix_projet: '24',
        co2_projet: '28.7',
        prix_sur_30_ans: '24',
        co2_sur_30_ans: '28.7',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'BC5 - 15cm',
        prix_projet: '30',
        co2_projet: '35.6',
        prix_sur_30_ans: '30',
        co2_sur_30_ans: '35.6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'BC5 - 16cm',
        prix_projet: '32',
        co2_projet: '38.0',
        prix_sur_30_ans: '32',
        co2_sur_30_ans: '38.0',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'BC5 - 18cm',
        prix_projet: '36',
        co2_projet: '42.7',
        prix_sur_30_ans: '36',
        co2_sur_30_ans: '42.7',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'BC5 - 20cm',
        prix_projet: '40',
        co2_projet: '47.3',
        prix_sur_30_ans: '40',
        co2_sur_30_ans: '47.3',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'BC5 - 21cm',
        prix_projet: '42',
        co2_projet: '49.6',
        prix_sur_30_ans: '42',
        co2_sur_30_ans: '49.6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'BC5 - 22cm',
        prix_projet: '44',
        co2_projet: '51.9',
        prix_sur_30_ans: '44',
        co2_sur_30_ans: '51.9',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'BC5 - 23cm',
        prix_projet: '46',
        co2_projet: '54.2',
        prix_sur_30_ans: '46',
        co2_sur_30_ans: '54.2',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'BC5 - 24cm',
        prix_projet: '48',
        co2_projet: '56.6',
        prix_sur_30_ans: '48',
        co2_sur_30_ans: '56.6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'Sol traité LHR - 35 cm',
        prix_projet: '15',
        co2_projet: '7.7',
        prix_sur_30_ans: '15',
        co2_sur_30_ans: '7.7',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'GNT - 35 cm',
        prix_projet: '11',
        co2_projet: '3.1',
        prix_sur_30_ans: '11',
        co2_sur_30_ans: '3.1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'Terrassement',
        prix_projet: '15',
        co2_projet: '8.7',
        prix_sur_30_ans: '15',
        co2_sur_30_ans: '8.7',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'Tramway Pavés',
        prix_projet: '250',
        co2_projet: '90.0',
        prix_sur_30_ans: '500',
        co2_sur_30_ans: '180.0',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'Tramway béton',
        prix_projet: '180',
        co2_projet: '120.0',
        prix_sur_30_ans: '360',
        co2_sur_30_ans: '240.0',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'Tramway enrobé',
        prix_projet: '120',
        co2_projet: '110.0',
        prix_sur_30_ans: '240',
        co2_sur_30_ans: '220.0',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'Tramway gazon',
        prix_projet: '160',
        co2_projet: '70.0',
        prix_sur_30_ans: '320',
        co2_sur_30_ans: '140.0',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'Tramway ballast',
        prix_projet: '130',
        co2_projet: '70.0',
        prix_sur_30_ans: '260',
        co2_sur_30_ans: '140.0',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nom: 'Bloc fonctionnel',
        prix_projet: '-',
        co2_projet: '0.0',
        prix_sur_30_ans: '-',
        co2_sur_30_ans: '0.0',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PavementStructure', null, {})
  }
}
