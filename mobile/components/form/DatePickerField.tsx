import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { FormInput } from './FormInput';

interface DatePickerFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
}

// Simplified date picker - user enters date in MM/DD/YYYY format
// For a native date picker, install @react-native-community/datetimepicker
export function DatePickerField<T extends FieldValues>({
  name,
  control,
  label,
}: DatePickerFieldProps<T>) {
  return (
    <FormInput
      name={name}
      control={control}
      label={label}
      placeholder="MM/DD/YYYY"
      keyboardType="default"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
});
