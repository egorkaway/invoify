import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useFormContext } from 'react-hook-form';
import { InvoiceType } from '@/shared/types';
import { FormInput } from '@/components/form/FormInput';

export function BillFromSection() {
  const { control } = useFormContext<InvoiceType>();

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Bill From
      </Text>

      <FormInput
        name="sender.name"
        control={control}
        label="Name"
        placeholder="Your company name"
      />

      <FormInput
        name="sender.address"
        control={control}
        label="Address"
        placeholder="Street address"
        multiline
      />

      <FormInput
        name="sender.zipCode"
        control={control}
        label="Zip Code"
        placeholder="12345"
      />

      <FormInput
        name="sender.city"
        control={control}
        label="City"
        placeholder="City"
      />

      <FormInput
        name="sender.country"
        control={control}
        label="Country"
        placeholder="Country"
      />

      <FormInput
        name="sender.email"
        control={control}
        label="Email"
        placeholder="email@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <FormInput
        name="sender.phone"
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
