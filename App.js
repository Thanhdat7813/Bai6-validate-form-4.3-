import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const validatePhone = (value) => {
    setPhone(value);
    const trimmed = value.trim();

    if (trimmed === '') {
      setError('Số điện thoại không được để trống');
      return;
    }

    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(trimmed)) {
      setError('Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0');
    } else {
      setError('');
    }
  };

  const handleConfirm = () => {
    if (error || phone.trim() === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại hợp lệ');
      return;
    }

    Alert.alert('Thành công', 'Xác nhận số điện thoại thành công');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <Text style={styles.label}>Nhập số điện thoại</Text>
      <Text style={styles.desc}>
        Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
      </Text>

      {/* Chú thích yêu cầu */}
      <Text style={styles.note}>
        * Số điện thoại gồm 10 chữ số, bắt đầu bằng 0
      </Text>

      <TextInput
        placeholder="Nhập số điện thoại của bạn"
        keyboardType="phone-pad"
        style={[
          styles.input,
          error ? styles.inputError : null
        ]}
        value={phone}
        onChangeText={validatePhone}
      />

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      {/* Nút xác nhận */}
      <TouchableOpacity
        style={[
          styles.button,
          (error || phone === '') && styles.buttonDisabled
        ]}
        onPress={handleConfirm}
        disabled={error !== '' || phone === ''}
      >
        <Text style={styles.buttonText}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  desc: {
    color: '#666',
    marginVertical: 10,
  },
  note: {
    color: '#888',
    fontSize: 13,
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: '#999',
  },
  inputError: {
    borderBottomColor: 'red',
  },
  error: {
    color: 'red',
    marginTop: 6,
    fontSize: 14,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
})
