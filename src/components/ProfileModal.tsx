import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

interface ProfileModalProps {
  modalVisible: boolean;
  toggleModal: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  // Retrieve user data from Redux store
  const { name, pic } = useSelector((state: any) => state.profileData.data); // Adjust state path if necessary

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleModalClose = (screen: string) => {
    navigation.navigate(screen as never);
    setModalVisible(!modalVisible);
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View className="flex-1 justify-start items-end pr-5 pt-5">
      {/* Touchable Profile Image on the Right */}
      <TouchableOpacity onPress={toggleModal} className="flex-row justify-end items-center">
        <Image
          source={pic ? { uri: pic } : require('../../assets/Images/profile_image.png')}
          className="w-12 h-12 rounded-full"
        />
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
        animationType="slide"
      >
        <View className="flex-1 justify-center items-center bg-black/20">
          <View className="bg-white rounded-lg p-5" style={{ width: screenWidth * 0.8 }}>
            <ScrollView>
              <View className="items-center mb-5">
                {/* Use the name from Redux store */}
                <Text className="text-xl font-bold mb-1">{name || 'User'}</Text>
              </View>

              {/* Modal Options */}
              <TouchableOpacity className="py-3 border-b border-gray-200" onPress={() => handleModalClose("Activity")}>
                <Text className="text-center text-base">Activity</Text>
              </TouchableOpacity>
              <TouchableOpacity className="py-3 border-b border-gray-200" onPress={() => handleModalClose("About Us")}>
                <Text className="text-center text-base">About Us</Text>
              </TouchableOpacity>
              <TouchableOpacity className="py-3 border-b border-gray-200" onPress={() => handleModalClose("ContactUs")}>
                <Text className="text-center text-base">Contact Us</Text>
              </TouchableOpacity>
              <TouchableOpacity className="py-3 border-b border-gray-200" onPress={() => handleModalClose("Policy")}>
                <Text className="text-center text-base">Cancellation Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity className="py-3 border-b border-gray-200" onPress={() => handleModalClose("Terms")}>
                <Text className="text-center text-base">Terms & Conditions</Text>
              </TouchableOpacity>
              <TouchableOpacity className="py-3 border-b border-gray-200" onPress={() => handleModalClose("ProfileScreen")}>
                <Text className="text-center text-base">Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity className="py-3" onPress={() => handleModalClose("FAQ")}>
                <Text className="text-center text-base">FAQ</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileModal;
