import { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button, ProgressBar } from 'react-native-paper';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { InvoiceType } from '@/shared/types';
import { storageService } from '@/services/storage';
import { BillFromSection } from './sections/BillFromSection';
import { BillToSection } from './sections/BillToSection';
import { InvoiceDetailsSection } from './sections/InvoiceDetailsSection';
import { ItemsSection } from './sections/ItemsSection';
import { PaymentInformationSection } from './sections/PaymentInformationSection';
import { InvoiceSummarySection } from './sections/InvoiceSummarySection';

const STEPS = [
  { id: 1, label: 'Bill From', component: BillFromSection },
  { id: 2, label: 'Bill To', component: BillToSection },
  { id: 3, label: 'Invoice Details', component: InvoiceDetailsSection },
  { id: 4, label: 'Items', component: ItemsSection },
  { id: 5, label: 'Payment Info', component: PaymentInformationSection },
  { id: 6, label: 'Summary', component: InvoiceSummarySection },
];

export function InvoiceFormWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const { trigger, handleSubmit, formState } = useFormContext<InvoiceType>();
  const StepComponent = STEPS[currentStep].component;
  const progress = (currentStep + 1) / STEPS.length;

  const handleNext = async () => {
    // Validate current step before proceeding
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);
    
    if (isValid && currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (isValid && currentStep === STEPS.length - 1) {
      // Last step - save the invoice
      await handleSubmit(onSubmit)();
    }
  };

  const onSubmit = async (data: InvoiceType) => {
    setSaving(true);
    try {
      // Calculate totals if not already calculated
      const subTotal = data.details.items.reduce((sum: number, item: any) => {
        const quantity = Number(item.quantity) || 0;
        const unitPrice = Number(item.unitPrice) || 0;
        return sum + quantity * unitPrice;
      }, 0);

      data.details.subTotal = subTotal;
      data.details.totalAmount = subTotal; // Add tax/discount calculations later

      // Save invoice
      const saved = await storageService.saveInvoice(data);
      if (saved) {
        Alert.alert('Success', 'Invoice saved successfully!', [
          { text: 'OK', onPress: () => router.push('/') },
        ]);
      } else {
        Alert.alert('Error', 'Failed to save invoice');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to save invoice');
    } finally {
      setSaving(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getFieldsForStep = (step: number): any => {
    switch (step) {
      case 0:
        return ['sender'];
      case 1:
        return ['receiver'];
      case 2:
        return ['details.invoiceNumber', 'details.invoiceDate', 'details.dueDate'];
      case 3:
        return ['details.items'];
      case 4:
        return ['details.paymentInformation'];
      default:
        return [];
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.stepTitle}>
          {STEPS[currentStep].label}
        </Text>
        <Text variant="bodySmall" style={styles.stepIndicator}>
          Step {currentStep + 1} of {STEPS.length}
        </Text>
      </View>

      <ProgressBar progress={progress} color="#6200ee" style={styles.progressBar} />

      <View style={styles.content}>
        <StepComponent />
      </View>

      <View style={styles.actions}>
        {currentStep > 0 && (
          <Button
            mode="outlined"
            onPress={handlePrevious}
            style={styles.button}
          >
            Previous
          </Button>
        )}
        <Button
          mode="contained"
          onPress={handleNext}
          style={[styles.button, styles.nextButton]}
          loading={saving}
          disabled={saving}
        >
          {currentStep === STEPS.length - 1 ? 'Save Invoice' : 'Next'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 16,
  },
  stepTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  stepIndicator: {
    color: '#666',
  },
  progressBar: {
    height: 4,
    marginBottom: 24,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    marginBottom: 24,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
  },
  nextButton: {
    marginLeft: 'auto',
  },
});
