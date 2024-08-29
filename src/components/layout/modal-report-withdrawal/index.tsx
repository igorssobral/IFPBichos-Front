import React from 'react';
import {
  reportWithdrawalSchema,
  ReportWithdrawalSchema,
} from '../../../schemas/report-withdrawal-schema';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { theme } from '../../../themes/styles';
import { Box, DialogTitle, Modal } from '@mui/material';
import CustomTextField from '../../ui/customTextField';
import { ButtonGroup } from '../../ui/button-group';
import { Button } from '../../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
    isVisible: boolean;
    onClose: () => void;
  };

export const ReportWithdrawal = ({isVisible,onClose}:Props) => {

  const {
    handleSubmit: handleReportWithdrawalSubmit,
    formState: { errors: reportWithdrawalErrors },
    control: reportWithdrawalControl,
  } = useForm<ReportWithdrawalSchema>({
    resolver: zodResolver(reportWithdrawalSchema),
  });
  async function handleReportWithdrawal(value: ReportWithdrawalSchema) {
    console.log('🚀 ~ handleReportWithdrawal ~ value:', value)
    // await saveCampaign({
    //   start: campaign.startDate,
    //   end: campaign.finishedDate,
    //   title: campaign.title,
    //   animal: campaign.animal,
    //   description: campaign.description,
    //   image: campaign.file,
    //   collectionGoal: campaign.fundraisingGoal,
    // })
    //   .then((response) => {
    //     // handleBack();
    //     toast.success(response);
    //   })
    //   .catch((error) => {
    //     toast.error(error);
    //   });
  }
//   const handleCloseModalRetirada = () => setOpenModalRetirada(false);

  const onSubmitReportWithdrawal: SubmitHandler<ReportWithdrawalSchema> = (
    data
  ) => {
    handleReportWithdrawal(data);
  };

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };
  return (
    <Modal open={isVisible} onClose={onClose}>
      <form onSubmit={handleReportWithdrawalSubmit(onSubmitReportWithdrawal)}>
        <Box sx={style} display={'flex'} flexDirection={'column'}>
          <DialogTitle
            id='responsive-dialog-title'
            textAlign={'center'}
            color={theme.colors.redPrimary}
          >
            {'Informar Retirada'}
          </DialogTitle>
          <Controller
            control={reportWithdrawalControl}
            name='campaign'
            render={({ field }) => (
              <CustomTextField
                type='text'
                label='Campanha'
                id='acao'
                helperText={reportWithdrawalErrors?.campaign?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={reportWithdrawalControl}
            name='action'
            render={({ field }) => (
              <CustomTextField
                type='text'
                label='Ação'
                id='motivation'
                multiline
                height='100px'
                minRows={4}
                maxRows={4}
                helperText={reportWithdrawalErrors?.action?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={reportWithdrawalControl}
            name='value'
            render={({ field }) => (
              <CustomTextField
                type='text'
                label='Valor'
                id='value'
                placeholder='R$'
                helperText={reportWithdrawalErrors?.value?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={reportWithdrawalControl}
            name='file'
            render={({ field }) => (
              <CustomTextField
                type='file'
                label='Comprovante'
                id='value'
                helperText={reportWithdrawalErrors?.file?.message}
                {...field}
              />
            )}
          />

          <ButtonGroup>
            <Button
              label='Salvar'
              headlight
              width='100px'
              type='submit'
              onClick={() => {}}
            />
            <Button
              label='Cancelar'
              width='100px'
              onClick={onClose}
            />
          </ButtonGroup>
        </Box>
      </form>
    </Modal>
  );
};
