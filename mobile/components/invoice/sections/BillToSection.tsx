import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useFormContext } from 'react-hook-form';
import { InvoiceType } from '@/shared/types';
import { FormInput } from '@/components/form/FormInput';

export function BillToSection() {
  const { control } = useFormContext<InvoiceType>();

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Bill To
      </Text>

      <FormInput
        name="receiver.name"
        control={control}
        label="Name"
        placeholder="Client company name"
      />

      <FormInput
        name="receiver.address"
        control={control}
        label="Address"
        placeholder="Street address"
        multiline
      />

      <FormInput
        name="receiver.zipCode"
        control={control}
        label="Zip Code"
        placeholder="12345"
      />

      <FormInput
        name="receiver.city"
        control={control}
        label="City"
        placeholder="City"
      />

      <FormInput
        name="receiver.country"
        control={control}
        label="Country"
        placeholder="Country"
      />

      <FormInput
        name="receiver.email"
        control={control}
        label="Email"
        placeholder="email@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <FormInput
        name="receiver.phone"
        control={control}
        label="Phone"
        placeholder="+1 234 567 8900"
        keyboardType="phone-pad"
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
