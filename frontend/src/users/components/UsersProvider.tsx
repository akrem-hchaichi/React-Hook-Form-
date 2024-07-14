
import { useForm, FormProvider } from "react-hook-form";
import { defaultValues, schema, userSchema } from '../types/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Users } from "./Users";
import { DevTool } from '@hookform/devtools';


export function UsersProvider() {

    const methods = useForm<userSchema>({
        mode: "all",
        resolver: zodResolver(schema),
        defaultValues
    })

    return (
        <FormProvider {...methods} >
            <Users />
            <DevTool control={methods.control} />
        </FormProvider>
    );
}
