
import { useFormContext } from 'react-hook-form'
import { userSchema } from '../types/schema'
import { Stack, TextField } from '@mui/material'
import { RHFAutocomplete } from '../../components/RHFAutocomplete'
import { useLanguages, useStates } from '../services/queries';
import { RHFToggleButtonGroup } from '../../components/RHFToggleButtonGroup';


export function Users() {
    const statesQuery = useStates();
    const languagesQuery = useLanguages();
    const { register, formState: { errors } } = useFormContext<userSchema>()

    return (
        <Stack sx={{ gap: 2 }}>
            <TextField
                {...register('name')}
                label="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
            />
            <TextField
                {...register('email')}
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
            />
            <RHFAutocomplete<userSchema>
                name="states"
                label="States"
                options={statesQuery.data}
            />
            <RHFToggleButtonGroup<userSchema>
                name="languagesSpoken"
                options={languagesQuery.data}
            />
        </Stack>
    )
}
