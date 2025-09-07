import { StyleSheet, Font } from '@react-pdf/renderer'

Font.register({
  family: 'Roboto',
  src: 'http://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf',
  fontStyle: 'normal',
  fontWeight: 'normal'
})

export const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontSize: '11pt',
    paddingTop: '40px',
    paddingBottom: '40px'
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
  table: {},
  tableRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    fontFamily: 'Roboto',
    borderTop: '1px solid black',
    borderRight: '1px solid black',
    borderBottom: '1px solid black',
    marginBottom: -1
  },
  tableCell: {
    borderLeft: '1px solid black',
    padding: '3px',
    textAlign: 'center'
  }
})
