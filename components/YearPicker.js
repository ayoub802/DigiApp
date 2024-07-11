import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const YearPicker = ({ visible, onClose, onSelect, selectedYear }) => {
  const currentYear = new Date().getFullYear();
  const [startYear, setStartYear] = useState(currentYear - (currentYear % 10)); // Start of the current decade

  const generateYears = () => {
    return Array.from(new Array(12), (val, index) => startYear - 1 + index); // Adjust range as needed
  };

  const years = generateYears();

  const handlePrevDecade = () => {
    setStartYear(startYear - 10);
  };

  const handleNextDecade = () => {
    setStartYear(startYear + 10);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handlePrevDecade}>
              <Text style={styles.navButton}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>{`${startYear - 1} - ${startYear + 10}`}</Text>
            <TouchableOpacity onPress={handleNextDecade}>
              <Text style={styles.navButton}>{'>'}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={years}
            numColumns={3}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
                onPress={() => onSelect(item)}
                disabled={item < currentYear - 50 || item > currentYear + 10} // Adjust range as needed
              >
                <Text style={[
                  styles.yearText, 
                  item < currentYear - 50 || item > currentYear  ? styles.disabledYear : null,
                  item == currentYear && {borderWidth: 1, borderColor: "#a1409d", borderRadius: 8},
                  item == selectedYear && {backgroundColor: "#a1409d",color: "#fff", borderRadius: 8,borderWidth: 1, borderColor: "#a1409d",}
                ]}>{item}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.grid}
          />
          <TouchableOpacity onPress={onClose} style={{ marginTop: 20 }}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: windowWidth * 0.85,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  navButton: {
    fontSize: 18,
    color: 'blue',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  grid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  yearText: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    width: windowWidth * 0.2,
  },
  disabledYear: {
    color: '#ccc',
  },
  closeButton: {
    textAlign: 'center',
    color: 'blue',
    fontSize: 18,
  },
});

export default YearPicker;
