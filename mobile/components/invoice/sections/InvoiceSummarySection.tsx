import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useFormContext, useWatch } from 'react-hook-form';
import { InvoiceType } from '@/shared/types';

export function InvoiceSummarySection() {
  const { control } = useFormContext<InvoiceType>();
  const items = useWatch({ control, name: 'details.items' });
  const subTotal = useWatch({ control, name: 'details.subTotal' });
  const totalAmount = useWatch({ control, name: 'details.totalAmount' });

  // Calculate totals
  const calculatedSubTotal = items?.reduce((sum: number, item: any) => {
    const quantity = Number(item.quantity) || 0;
    const unitPrice = Number(item.unitPrice) || 0;
    return sum + quantity * unitPrice;
  }, 0) || 0;

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Invoice Summary
      </Text>

      <Card style={styles.summaryCard}>
        <Card.Content>
          <View style={styles.summaryRow}>
            <Text variant="bodyLarge">Subtotal:</Text>
            <Text variant="bodyLarge" style={styles.amount}>
              ${calculatedSubTotal.toFixed(2)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text variant="bodyLarge" style={styles.totalLabel}>Total:</Text>
            <Text variant="titleLarge" style={styles.totalAmount}>
              ${(totalAmount || calculatedSubTotal).toFixed(2)}
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Text variant="bodySmall" style={styles.note}>
        Review your invoice details above. You can generate a PDF or export it in various formats.
      </Text>
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
  summaryCard: {
    marginVertical: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  amount: {
    fontWeight: '600',
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  totalAmount: {
    fontWeight: 'bold',
    color: '#6200ee',
  },
  note: {
    color: '#666',
    marginTop: 8,
  },
});
