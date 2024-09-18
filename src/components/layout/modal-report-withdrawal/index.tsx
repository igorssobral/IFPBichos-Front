import React, { useEffect, useState } from 'react';
import {
  reportWithdrawalSchema,
  ReportWithdrawalSchema,
} from '../../../schemas/report-withdrawal-schema';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { theme } from '../../../themes/styles';
import {
  Box,
  DialogTitle,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from '@mui/material';
import CustomTextField from '../../ui/customTextField';
import { ButtonGroup } from '../../ui/button-group';
import { Button } from '../../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { CampaignRaw } from '../../../services/@types/campaign';
import { ApiCampaign } from '../../../services/data-base/CampaignService';
import { ApiWithdrawal } from '../../../services/data-base/withdrawal-service';
import { toast } from 'react-toastify';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  sync: () => void;
};

export const ReportWithdrawal = ({ isVisible, onClose, sync }: Props) => {
  const { getAllCampaignsFinishedBalance } = ApiCampaign();
  const { saveWithdrawal } = ApiWithdrawal();

  const [campaigns, setCampaigns] = useState<CampaignRaw[]>([]);

  const [selectedCampaign, setSelectedCampaign] = useState<CampaignRaw | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCampaigns = await getAllCampaignsFinishedBalance();


      setCampaigns(fetchedCampaigns);
    };

    fetchData();
  }, []);

  const {
    handleSubmit: handleReportWithdrawalSubmit,
    formState: { errors: reportWithdrawalErrors },
    control: reportWithdrawalControl,
    setValue,
  } = useForm<ReportWithdrawalSchema>({
    resolver: zodResolver(reportWithdrawalSchema),
  });

  useEffect(() => {
    if (selectedCampaign) {
      setValue('action', selectedCampaign.description);
      setValue('value', selectedCampaign.balance);
    }
  }, [selectedCampaign, setValue]);

  async function handleReportWithdrawal(value: ReportWithdrawalSchema) {
    await saveWithdrawal({
      campaignId: value.campaign,
      receipt: null,
    })
      .then((response) => {
        onClose();
        sync();
        toast.success(response);
      })
      .catch((error) => {
        toast.error(error);
      });
  }

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
              <>
                <InputLabel sx={{ marginTop: '10px' }}>Campanha</InputLabel>
                <Select
                style={{width: '90%'}}
                  value={field.value || 0}
                  placeholder='Selecione'
                  onChange={(event) => {
                    const selectedId = event.target.value;
                    field.onChange(selectedId);

                    // Encontre a campanha selecionada e atualize o estado
                    const selected = campaigns.find(
                      (campaign) => campaign.id === selectedId
                    );

                    setSelectedCampaign(selected || null);
                  }}
                  error={!!reportWithdrawalErrors.campaign?.message}
                  sx={{ marginBottom: '10px', borderRadius: 2 }}
                >
                  <MenuItem value={0}>Selecione</MenuItem>
                  {campaigns.map((campaign) => (
                    <MenuItem key={campaign.id} value={campaign.id}>
                      {campaign.title}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error>
                  {reportWithdrawalErrors.campaign?.message}
                </FormHelperText>
              </>
            )}
          />
        
          <Controller
            control={reportWithdrawalControl}
            name='action'
            render={({ field }) => (
              <CustomTextField
                {...field}
                type='text'
                label='Ação'
                id='motivation'
                multiline
                height='100px'
                minRows={4}
                maxRows={4}
                helperText={reportWithdrawalErrors?.action?.message}
                disabled
              />
            )}
          />
          <Controller
            control={reportWithdrawalControl}
            name='value'
            render={({ field }) => (
              <CustomTextField
                {...field}
                type='text'
                label='Valor'
                id='value'
                placeholder='R$'
                helperText={reportWithdrawalErrors?.value?.message}
                disabled
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
            <Button label='Cancelar' width='100px' onClick={onClose} />
          </ButtonGroup>
        </Box>
      </form>
    </Modal>
  );
};
