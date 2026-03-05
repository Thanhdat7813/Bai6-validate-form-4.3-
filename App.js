import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

/* ================= LOGIN SCREEN ================= */

function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  // ✅ Hiển thị chào mừng 1 lần duy nhất
  useEffect(() => {
    Alert.alert('Chào mừng', 'Chào mừng bạn đến với hệ thống');
  }, []);

  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 10);

    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6)
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    if (cleaned.length <= 8)
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;

    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`;
  };

  const isValidPhone = (rawPhone) => {
    const regex = /^0\d{9}$/;
    return regex.test(rawPhone);
  };

  const handleChangeText = (value) => {
    const formatted = formatPhone(value);
    setPhone(formatted);
  };

  const handleConfirm = () => {
    const raw = phone.replace(/\s/g, '');

    if (raw === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại');
      return;
    }

    if (!isValidPhone(raw)) {
      setError('Số điện thoại không đúng định dạng. Vui lòng nhập lại');
      return;
    }

    setError('');
    Alert.alert('Thành công', 'Số điện thoại hợp lệ');

    // ✅ Chuyển sang Home + truyền số điện thoại
    navigation.navigate('Home', { phone: raw });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <Text style={styles.label}>Nhập số điện thoại</Text>
      <Text style={styles.desc}>
        Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản
      </Text>

      <Text style={styles.note}>
        * Số điện thoại gồm 10 chữ số, bắt đầu bằng 0
      </Text>

      <TextInput
        placeholder="Nhập số điện thoại của bạn"
        keyboardType="phone-pad"
        style={[styles.input, error ? styles.inputError : null]}
        value={phone}
        onChangeText={handleChangeText}
      />

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ================= HOME SCREEN ================= */

function HomeScreen({ route, navigation }) {
  const { phone } = route.params || {};

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.title}>Trang chủ</Text>

      <Text style={homeStyles.welcome}>
        Xin chào!
      </Text>

      <Text style={homeStyles.phone}>
        Số điện thoại: {phone}
      </Text>

      <TouchableOpacity
        style={homeStyles.logoutButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={homeStyles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ================= APP ROOT ================= */

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Đăng nhập' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Trang chủ' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* ================= STYLES LOGIN ================= */

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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

/* ================= STYLES HOME ================= */

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  emoji: {
    fontSize: 60,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 30,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  phone: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});