import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import { firebaseApp } from '@renderer/signals/firebaseApp'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import Unit from '@renderer/models/unit'
import InventoryItem, { InventoryItemToSave } from '@renderer/models/inventoryItem'
import { toast } from 'react-toastify'

type Inputs = {
    name: string
    unitId: string
    numberOfPacks: string
    price: string
}

export default function AddItemDialog({
    open,
    setOpen,
    name = '',
    unitId = '',

    numberOfPacks = '',
    price = ''
}: {
    open: boolean
    setOpen: (open: boolean) => void
} & Partial<Inputs>) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<Inputs>({
        values: {
            name,
            unitId,
            numberOfPacks,
            price
        }
    })

    const queryClient = useQueryClient()

    const {
        isError,
        isPending,
        data: units,
        error: unitError
    } = useQuery({ queryKey: ['units'], queryFn: () => firebaseApp.getUnits() })
    const mutation = useMutation({
        mutationFn: (item: InventoryItemToSave) => {
            return firebaseApp.createInventoryItem(item)
        },
        onError: (error) => {
            console.error(error)
            toast.error('Failed to add item')
        },
        onSuccess: () => {
            toast.success('Item added successfully')
            queryClient.invalidateQueries({ queryKey: ['inventoryItems'] })
        }
    })
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setOpen(false)

        const unit = units?.find((unit) => unit.id === data.unitId)
        if (!unit) return

        mutation.mutate({
            name: data.name,
            unit,
            amount: parseInt(data.numberOfPacks),
            price: parseFloat(data.price)
        })
    }
    if (isError) {
        console.error(unitError)
    }

    return (
        <Dialog
            onClose={() => {
                setOpen(false)
            }}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Add Inventory Item
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => {
                    setOpen(false)
                }}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500]
                }}
            >
                <CloseIcon />
            </IconButton>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent className="grid gap-3" dividers>
                    <TextField id="name" label="Name" variant="outlined" {...register('name')} />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                        <Select
                            {...register('unitId')}
                            labelId="demo-simple-select-label"
                            id="unit"
                            defaultValue={unitId}
                            label="Unit"
                        >
                            {isError && <MenuItem value="">Error: {unitError.message}</MenuItem>}
                            {isPending && <MenuItem value="">Loading...</MenuItem>}
                            {units?.map((unit) => (
                                <MenuItem key={unit.id} value={unit.id}>
                                    {unit.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            type="number"
                            id="outlined-basic"
                            label="Number of Packs"
                            variant="outlined"
                            {...register('numberOfPacks')}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            type="number"
                            id="outlined-basic"
                            label="Price"
                            variant="outlined"
                            {...register('price')}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" autoFocus>
                        Save changes
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}
