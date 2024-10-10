'use client';
import {
  Box,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Divider,
} from '@mui/material';
import Image from 'next/image';
import BaseButton from '../ui/BaseButton';
import Modal from '../ui/Modal';
import Cross from '/public/icons/cross.svg';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  text?: string;
  header?: string;
  submitText: string;
  dataTestId?: string;
};

const BaseModal = ({
  header,
  open,
  onClose,
  onSubmit,
  text,
  submitText,
  dataTestId,
}: Props) => {
  const Content = () => (
    <Box
      data-testid={dataTestId ? dataTestId : 'modal'}
      sx={{ display: 'flex', flexDirection: 'column', gap: '25px' }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '16px',
          p: 0,
          fontSize: { xs: '30px', md: '45px' },
          lineHeight: { xs: '35px', md: '53px' },
        }}
      >
        {header}
        <Image
          data-testid="modal__cross"
          src={Cross}
          alt="close"
          width={20}
          height={20}
          onClick={onClose}
          style={{
            alignSelf: 'start',
            cursor: 'pointer',
          }}
        />
      </DialogTitle>
      {text && (
        <DialogContentText variant="body1" sx={{ fontWeight: 300, padding: 0 }}>
          {text}
        </DialogContentText>
      )}
      <Divider />
      <DialogActions
        sx={{
          display: 'flex',
          p: 0,
          '& > *': { flexGrow: '1', height: { xs: '40px', md: '61px' } },
        }}
      >
        <BaseButton variant="outlined" onClick={onClose}>
          Cancel
        </BaseButton>
        <BaseButton
          onClick={() => {
            onSubmit();
            onClose();
          }}
        >
          {submitText}
        </BaseButton>
      </DialogActions>
    </Box>
  );

  return (
    <Modal
      dataTestId={`modal-${header}`}
      open={open}
      onClose={onClose}
      paperStyle={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: { xs: '24px', md: '56px' },
        boxSizing: 'border-box',
        borderRadius: '20px',
        width: { xs: '320px', md: '656px' },
      }}
    >
      <Content />
    </Modal>
  );
};

export default BaseModal;
