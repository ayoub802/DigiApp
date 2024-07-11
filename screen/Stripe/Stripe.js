import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

const StripeScreen = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  // Initialize the PaymentSheet
  const initializePaymentSheet = async () => {
    const result = await initPaymentSheet({
      paymentIntentClientSecret: 'YOUR_PAYMENT_INTENT_CLIENT_SECRET',
    });
    console.log('Initialize PaymentSheet result:', result);
  };

  // Handle payment button press
  const handlePayment = async () => {
    try {
      // Present the PaymentSheet
      const { error } = await presentPaymentSheet();
      if (error) {
        console.error('Error presenting PaymentSheet:', error);
      } else {
        console.log('PaymentSheet presented successfully');
      }
    } catch (error) {
      console.error('Error presenting PaymentSheet:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stripe Screen</Text>
      <TouchableOpacity style={styles.button} onPress={initializePaymentSheet}>
        <Text style={styles.buttonText}>Initialize PaymentSheet</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pay with Stripe</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  bottomSheetContent: {
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});

export default StripeScreen;
