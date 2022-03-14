import {View, Text} from 'react-native';
import React from 'react';
import {Button, Modal} from 'native-base';

export const ModalNative = ({
  show,
  handleShow,
  handleClose,
  handleNavigate,
  title,
  text,
}) => {
  return (
    <Modal
      isOpen={show}
      onClose={handleClose}
      _backdrop={{
        _dark: {
          bg: 'coolGray.800',
        },
        bg: 'warmGray.800',
      }}>
      <Modal.Content maxWidth="350" maxH="212">
        <Modal.CloseButton />
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>{text}</Modal.Body>
        <Modal.Footer>
          <Button.Group space={5}>
            <Button
              // variant="ghost"
              colorScheme="blueGray"
              onPress={handleClose}>
              No
            </Button>
            <Button colorScheme="yellow" onPress={handleNavigate}>
              Yes
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
