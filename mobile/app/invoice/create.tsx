import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Text, Button, Appbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InvoiceSchema, InvoiceType } from '@/shared/schemas';
import { InvoiceFormWizard } from '@/components/invoice/InvoiceFormWizard';
import { storageService } from '@/services/storage';

export default function CreateInvoiceScreen() {
  const router = useRouter();
  const form = useForm<InvoiceType>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      sender: {
        name: '',
        address: '',
        zipCode: '',
        city: '',
        country: '',
        email: '',
        phone: '',
      },
      receiver: {
        name: '',
        address: '',
        zipCode: '',
        city: '',
        country: '',
        email: '',
        phone: '',
      },
      details: {
        invoiceNumber: '',
        invoiceDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
        dueDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
        currency: 'USD',
        language: 'en',
        items: [],
        paymentTerms: '',
        subTotal: 0,
        totalAmount: 0,
        totalAmountInWords: '',
        pdfTemplate: 1,
      },
    },
  });

  const handleBack = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Appbar.Header>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title="Create Invoice" />
      </Appbar.Header>

      <FormProvider {...form}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
          <InvoiceFormWizard />
        </ScrollView>
      </FormProvider>
    </KeyboardAvoidingView>
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
    paddingBottom: 40,
  },
});
