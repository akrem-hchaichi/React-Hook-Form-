
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { defaultValues, userSchema } from '../types/schema'
import { Button, Container, List, ListItem, ListItemButton, ListItemText, ListSubheader, Stack, Typography } from '@mui/material'
import { RHFAutocomplete } from '../../components/RHFAutocomplete'
import { useGenders, useLanguages, useSkills, useStates, useUser, useUsers } from '../services/queries';
import { RHFToggleButtonGroup } from '../../components/RHFToggleButtonGroup';
import { RHFRadioGroup } from '../../components/RHFRadioGroup';
import { RHFCheckbox } from '../../components/RHFCheckbox';
import { RHFDateTimePicker } from '../../components/RHFDateTimePicker';
import { RHFDateRangePicker } from '../../components/RHFDateRangePicker';
import { RHFSlider } from '../../components/RHFSlider';
import { RHFSwitch } from '../../components/RHFSwitch';
import { RHFTextField } from '../../components/RHFTextField';
import { Fragment, useEffect } from 'react';


export function Users() {
    const statesQuery = useStates();
    const languagesQuery = useLanguages();
    const gendersQuery = useGenders();
    const skillsQuery = useSkills();
    const usersQuery = useUsers();

    const { register, control, unregister, reset, setValue, formState: { errors } } = useFormContext<userSchema>()

    const id = useWatch({ control, name: 'id' });
    const isTeacher = useWatch({ control, name: 'isTeacher' });
    const userQuery = useUser(id);

    const { append, fields, remove, replace } = useFieldArray({
        control,
        name: 'students',
    });

    const handleReset = () => {
        reset(defaultValues);
    };

    const handleUserClick = (id: string) => {
        setValue('id', id);
    };

    useEffect(() => {
        if (!isTeacher) {
            replace([]);
            unregister('students');
        }
    }, [isTeacher, replace, unregister]);

    useEffect(() => {
        if (userQuery.data) {
            reset(userQuery.data);
        }
    }, [reset, userQuery.data]);

    return (
        <Container maxWidth="sm" component="form" >
            <Stack sx={{ flexDirection: 'row', gap: 2 }}>

                <List subheader={<ListSubheader>Users</ListSubheader>}>
                    {usersQuery.data?.map((user) => (
                        <ListItem disablePadding key={user.id}>
                            <ListItemButton
                                onClick={() => handleUserClick(user.id)}
                                selected={id === user.id}
                            >
                                <ListItemText primary={user.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Stack sx={{ gap: 2 }}>
                    <RHFTextField<userSchema> name="name" label="Name" />
                    <RHFTextField<userSchema> name="email" label="Email" />
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
                    <RHFSwitch<userSchema> name="isTeacher" label="Are you a teacher?" />

                    {isTeacher && (
                        <Button onClick={() => append({ name: '' })} type="button">
                            Add new student
                        </Button>
                    )}

                    {fields.map((field, index) => (
                        <Fragment key={field.id}>
                            <RHFTextField<userSchema>
                                name={`students.${index}.name`}
                                label="Name"
                            />
                            <Button
                                color="error"
                                onClick={() => {
                                    remove(index);
                                }}
                                type="button"
                            >
                                Remove
                            </Button>
                        </Fragment>
                    ))}

                    <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button type="submit">
                            New user
                        </Button>
                        <Button onClick={handleReset}>Reset</Button>
                    </Stack>
                </Stack>
            </Stack>
        </Container >
    )
}
