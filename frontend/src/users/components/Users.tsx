
import { useFormContext } from 'react-hook-form'
import { userSchema } from '../types/schema'
import { Stack, TextField, Typography } from '@mui/material'
import { RHFAutocomplete } from '../../components/RHFAutocomplete'
import { useGenders, useLanguages, useSkills, useStates } from '../services/queries';
import { RHFToggleButtonGroup } from '../../components/RHFToggleButtonGroup';
import { RHFRadioGroup } from '../../components/RHFRadioGroup';
import { RHFCheckbox } from '../../components/RHFCheckbox';
import { RHFDateTimePicker } from '../../components/RHFDateTimePicker';
import { RHFDateRangePicker } from '../../components/RHFDateRangePicker';
import { RHFSlider } from '../../components/RHFSlider';


export function Users() {
    const statesQuery = useStates();
    const languagesQuery = useLanguages();
    const gendersQuery = useGenders();
    const skillsQuery = useSkills();

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
            <RHFRadioGroup<userSchema>
                name="gender"
                options={gendersQuery.data}
                label="Gender"
            />
            <RHFCheckbox<userSchema>
                name="skills"
                options={skillsQuery.data}
                label="Skills"
            />
            <RHFDateTimePicker<userSchema>
                name="registrationDateAndTime"
                label="Registration Date & Time"
            />
            <Typography>Former Employment Period:</Typography>
            <RHFDateRangePicker<userSchema> name="formerEmploymentPeriod" />
            <RHFSlider<userSchema> name="salaryRange" label="Salary Range" />

        </Stack>
    )
}
