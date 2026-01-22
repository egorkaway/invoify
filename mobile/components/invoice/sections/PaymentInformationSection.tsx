import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useFormContext } from 'react-hook-form';
import { InvoiceType } from '@/shared/types';
import { FormInput } from '@/components/form/FormInput';

export function PaymentInformationSection() {
  const { control } = useFormContext<InvoiceType>();

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Payment Information
      </Text>

      <FormInput
        name="details.paymentInformation.bankName"
        control={control}
        label="Bank Name"
        placeholder="Bank name"
      />

      <FormInput
        name="details.paymentInformation.accountName"
        control={control}
        label="Account Name"
        placeholder="Account holder name"
      />

      <FormInput
        name="details.paymentInformation.accountNumber"
        control={control}
        label="Account Number"
        placeholder="Account number"
        keyboardType="numeric"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  sectionTitle: {
    marginBottom: 8,
    fontWeight: '600',
  },
});
