
import { useFormContext } from 'react-hook-form'
import { userSchema } from '../types/schema'
import { Stack, TextField } from '@mui/material'
import { RHFAutocomplete } from '../../components/RHFAutocomplete'

const options = [
    { label: 'Tunis', id: "1" },
    { label: 'Nabeul', id: "2" },
];

export function Users() {

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
                options={options}
            />
        </Stack>
    )
}
