import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, FAB } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InvoiceType } from '@/shared/types';

export default function HomeScreen() {
  const router = useRouter();
  const [savedInvoices, setSavedInvoices] = useState<InvoiceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSavedInvoices();
  }, []);

  const loadSavedInvoices = async () => {
    try {
      const saved = await AsyncStorage.getItem('invoices');
      if (saved) {
        setSavedInvoices(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    router.push('/invoice/create');
  };

  const handleOpenInvoice = (invoice: InvoiceType) => {
    // Generate a temporary ID if not exists
    const id = Date.now().toString();
    router.push(`/invoice/${id}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Invoify
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Create and manage your invoices
        </Text>

        {savedInvoices.length > 0 && (
          <View style={styles.savedSection}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Recent Invoices
            </Text>
            {savedInvoices.slice(0, 5).map((invoice, index) => (
              <Card
                key={index}
                style={styles.card}
                onPress={() => handleOpenInvoice(invoice)}
              >
                <Card.Content>
                  <Text variant="titleSmall">
                    {invoice.details.invoiceNumber}
                  </Text>
                  <Text variant="bodySmall" style={styles.cardSubtext}>
                    {invoice.receiver.name}
                  </Text>
                  <Text variant="bodySmall" style={styles.cardSubtext}>
                    {invoice.details.invoiceDate}
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        )}

        <Button
          mode="contained"
          onPress={handleCreateNew}
          style={styles.createButton}
          contentStyle={styles.buttonContent}
        >
          Create New Invoice
        </Button>
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={handleCreateNew}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    marginTop: 20,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: 24,
    color: '#666',
  },
  savedSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: '600',
  },
  card: {
    marginBottom: 12,
  },
  cardSubtext: {
    color: '#666',
    marginTop: 4,
  },
  createButton: {
    marginTop: 20,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});
