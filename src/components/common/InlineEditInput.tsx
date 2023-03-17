import { useState } from 'react'
import { useForm } from 'react-hook-form'

type InlineEditInputProps = {
    fieldValue: string,
    value: string,
    onChange: (value: string) => void,
    required: boolean
}

export const InlineEditInput = (props: InlineEditInputProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(props.value)

    const handleCancel = () => {
        setValue(props.value)
        setIsEditing(false)
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm();

    const onErrors = (errors: any) => console.error(errors);

    const onFormSubmit = (data: any) => {
        console.log(data)
        setValue(data.Name)
        props.onChange(data.Name)
        setIsEditing(false)
    }

  return (
    <>
        {isEditing ? (
            <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
                <input
                    className="max-w-ful w-full max-w-4xl rounded-md border p-1"
                    type="text"
                    defaultValue={value}
                    {...register(props.fieldValue, { required: props.required })}
                />
                {errors.value && <span>This field is required</span>}
                <button type="submit">Save</button>
                <button onClick={() => handleCancel}>Cancel</button>
            </form>
        ) : (
            <div className="flex flex-row items-center">
                <span className="mr-2">{value}</span>
                <button onClick={() => setIsEditing(true)}>Edit</button>
            </div>
        )}
    </>
  )
}
