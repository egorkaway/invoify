import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useFormContext } from 'react-hook-form';
import { InvoiceType } from '@/shared/types';
import { FormInput } from '@/components/form/FormInput';
import { DatePickerField } from '@/components/form/DatePickerField';

export function InvoiceDetailsSection() {
  const { control } = useFormContext<InvoiceType>();

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Invoice Details
      </Text>

      <FormInput
        name="details.invoiceNumber"
        control={control}
        label="Invoice Number"
        placeholder="INV-001"
      />

      <DatePickerField
        name="details.invoiceDate"
        control={control}
        label="Invoice Date"
      />

      <DatePickerField
        name="details.dueDate"
        control={control}
        label="Due Date"
      />

      <FormInput
        name="details.paymentTerms"
        control={control}
        label="Payment Terms"
        placeholder="Net 30"
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
