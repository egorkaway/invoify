import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { InvoiceType } from '@/shared/types';
import { FormInput } from '@/components/form/FormInput';

export function ItemsSection() {
  const { control } = useFormContext<InvoiceType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'details.items',
  });

  const addItem = () => {
    append({
      name: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Items
        </Text>
        <Button mode="contained" onPress={addItem} compact>
          Add Item
        </Button>
      </View>

      <ScrollView style={styles.itemsList}>
        {fields.map((field, index) => (
          <Card key={field.id} style={styles.itemCard}>
            <Card.Content>
              <View style={styles.itemHeader}>
                <Text variant="titleSmall">Item {index + 1}</Text>
                {fields.length > 1 && (
                  <Button
                    mode="text"
                    onPress={() => remove(index)}
                    textColor="red"
                    compact
                  >
                    Remove
                  </Button>
                )}
              </View>

              <FormInput
                name={`details.items.${index}.name`}
                control={control}
                label="Item Name"
                placeholder="Product or service name"
              />

              <FormInput
                name={`details.items.${index}.description`}
                control={control}
                label="Description"
                placeholder="Item description (optional)"
                multiline
              />

              <View style={styles.row}>
                <View style={styles.halfWidth}>
                  <FormInput
                    name={`details.items.${index}.quantity`}
                    control={control}
                    label="Quantity"
                    placeholder="1"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.halfWidth}>
                  <FormInput
                    name={`details.items.${index}.unitPrice`}
                    control={control}
                    label="Unit Price"
                    placeholder="0.00"
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontWeight: '600',
  },
  itemsList: {
    maxHeight: 400,
  },
  itemCard: {
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
});
