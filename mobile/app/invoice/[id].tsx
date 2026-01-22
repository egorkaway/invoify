import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, Appbar, Card, FAB, Menu } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { InvoiceType } from '@/shared/types';
import { invoiceApi } from '@/services/api';
import { storageService } from '@/services/storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function InvoiceDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [invoice, setInvoice] = useState<InvoiceType | null>(null);
  const [loading, setLoading] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  // In a real app, load invoice from storage or API
  // For now, this is a placeholder

  const handleGeneratePdf = async () => {
    if (!invoice) return;
    
    setLoading(true);
    try {
      const result = await invoiceApi.generatePdf(invoice);
      if (result.success && result.pdf) {
        // Save PDF to device
        const fileUri = FileSystem.documentDirectory + `invoice-${invoice.details.invoiceNumber}.pdf`;
        await FileSystem.writeAsStringAsync(fileUri, result.pdf, {
          encoding: FileSystem.EncodingType.Base64,
        });
        
        // Share the PDF
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(fileUri);
        } else {
          Alert.alert('Success', 'PDF generated successfully');
        }
      } else {
        Alert.alert('Error', result.error || 'Failed to generate PDF');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to generate PDF');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format: 'JSON' | 'CSV' | 'XML' | 'XLSX') => {
    if (!invoice) return;
    
    setLoading(true);
    try {
      const result = await invoiceApi.exportInvoice(invoice, format);
      if (result.success && result.data) {
        const fileUri = FileSystem.documentDirectory + `invoice-${invoice.details.invoiceNumber}.${format.toLowerCase()}`;
        await FileSystem.writeAsStringAsync(fileUri, result.data, {
          encoding: FileSystem.EncodingType.Base64,
        });
        
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(fileUri);
        } else {
          Alert.alert('Success', `Invoice exported as ${format}`);
        }
      } else {
        Alert.alert('Error', result.error || 'Failed to export invoice');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to export invoice');
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!invoice) return;
    
    Alert.prompt(
      'Send Invoice',
      'Enter recipient email address:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send',
          onPress: async (email) => {
            if (!email) return;
            
            setLoading(true);
            try {
              const result = await invoiceApi.sendPdfToEmail(invoice, email);
              if (result.success) {
                Alert.alert('Success', 'Invoice sent successfully');
              } else {
                Alert.alert('Error', result.error || 'Failed to send email');
              }
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to send email');
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      'plain-text'
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Invoice Details" />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              onPress={() => setMenuVisible(true)}
            />
          }
        >
          <Menu.Item onPress={handleGeneratePdf} title="Generate PDF" />
          <Menu.Item onPress={() => handleExport('JSON')} title="Export JSON" />
          <Menu.Item onPress={() => handleExport('CSV')} title="Export CSV" />
          <Menu.Item onPress={() => handleExport('XLSX')} title="Export XLSX" />
          <Menu.Item onPress={handleSendEmail} title="Send Email" />
        </Menu>
      </Appbar.Header>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {invoice ? (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="headlineSmall" style={styles.invoiceNumber}>
                Invoice #{invoice.details.invoiceNumber}
              </Text>
              <Text variant="bodyMedium" style={styles.date}>
                Date: {invoice.details.invoiceDate}
              </Text>
              <Text variant="bodyMedium" style={styles.date}>
                Due: {invoice.details.dueDate}
              </Text>

              <View style={styles.section}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Bill From
                </Text>
                <Text>{invoice.sender.name}</Text>
                <Text>{invoice.sender.address}</Text>
                <Text>
                  {invoice.sender.city}, {invoice.sender.zipCode}
                </Text>
                <Text>{invoice.sender.country}</Text>
              </View>

              <View style={styles.section}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Bill To
                </Text>
                <Text>{invoice.receiver.name}</Text>
                <Text>{invoice.receiver.address}</Text>
                <Text>
                  {invoice.receiver.city}, {invoice.receiver.zipCode}
                </Text>
                <Text>{invoice.receiver.country}</Text>
              </View>

              <View style={styles.section}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Items
                </Text>
                {invoice.details.items.map((item: any, index: number) => (
                  <View key={index} style={styles.itemRow}>
                    <Text>{item.name}</Text>
                    <Text>
                      {item.quantity} x ${item.unitPrice} = ${item.total}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.totalSection}>
                <Text variant="titleLarge" style={styles.total}>
                  Total: ${invoice.details.totalAmount.toFixed(2)}
                </Text>
              </View>
            </Card.Content>
          </Card>
        ) : (
          <Text>Loading invoice...</Text>
        )}
      </ScrollView>

      <FAB
        icon="file-pdf-box"
        style={styles.fab}
        onPress={handleGeneratePdf}
        loading={loading}
        label="PDF"
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
  card: {
    marginBottom: 20,
  },
  invoiceNumber: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    color: '#666',
    marginBottom: 4,
  },
  section: {
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalSection: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  total: {
    fontWeight: 'bold',
    color: '#6200ee',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});
