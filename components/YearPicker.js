import React, { useState } from 'react';
import { View, Text, Button, Modal, Picker, StyleSheet } from 'react-native';

const YearPicker = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [modalVisible, setModalVisible] = useState(false);

  const generateYears = () => {
    const years = [];
    for (let i = 1900; i <= currentYear; i++) {
      years.push(i);
    }
    return years;
  };

  const handleYearChange = (itemValue) => {
    setSelectedYear(itemValue);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Year:</Text>
      <Button title="Show Year Picker" onPress={() => setModalVisible(true)} />
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedYear}
              onValueChange={(itemValue) => handleYearChange(itemValue)}
            >
              {generateYears().map((year) => (
                <Picker.Item key={year} label={year.toString()} value={year} />
              ))}
            </Picker>
            <Button title="Done" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      <Text style={styles.selectedYear}>Selected Year: {selectedYear}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    marginBottom: 20,
  },
  selectedYear: {
    marginTop: 20,
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
});

export default YearPicker;
