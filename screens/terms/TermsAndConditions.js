import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const TermsAndConditions = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>
      <Text style={styles.subtitle}>Last updated: [Date]</Text>

      <Text style={styles.sectionHeader}>1. Subscription Plans</Text>
      <Text style={styles.paragraph}>
        1.1 Monthly Subscription: Users who select the monthly subscription plan
        can cancel at any time. If the subscription is canceled, the charge will
        be stopped after the last paid month has completed.
      </Text>

      <Text style={styles.paragraph}>
        1.2 Yearly Subscription: Users who select the yearly subscription plan
        can cancel, but the subscription will continue until the end of the
        year.
      </Text>

      <Text style={styles.paragraph}>
        1.3 Free Package: Users on the free package will have a free trial
        month. After the free trial month, users must select a new package and
        make the payment to continue using the service.
      </Text>

      <Text style={styles.sectionHeader}>2. Auto Renewal</Text>
      <Text style={styles.paragraph}>
        2.1 For users who select auto-renewal, if there are insufficient funds
        on the card during the time of renewal, all account features will be
        temporarily suspended until the full payment for the previous and
        remaining time is made.
      </Text>

      <Text style={styles.sectionHeader}>3. Account Termination</Text>
      <Text style={styles.paragraph}>
        3.1 The service reserves the right to terminate user accounts in cases
        of violation of these terms and conditions or for other reasons
        specified in the service policies.
      </Text>

      {/* Add more sections and paragraphs as needed for your terms and conditions */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default TermsAndConditions;
