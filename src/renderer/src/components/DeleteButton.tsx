import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import InventoryItem from '@renderer/models/inventoryItem'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { firebaseApp } from '@renderer/signals/firebaseApp'
import { toast } from 'react-toastify'
interface Props {
    item: InventoryItem
}
export default function DeleteButton({ item }: Props) {
    const [open, setOpen] = React.useState(false)
    const queryClient = useQueryClient()

    const handleClickOpen = () => {
        setOpen(true)
    }
    const mutation = useMutation({
        mutationFn: (item: InventoryItem) => {
            return firebaseApp.deleteInventoryItem(item.id)
        },
        onError: (error) => {
            console.error(error)
            toast.error('Failed to delete item')
        },
        onSuccess: () => {
            toast.success('Item deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['inventoryItems'] })
        }
    })
    const handleClose = () => {
        setOpen(false)
    }
    const handleDelete = () => {
        mutation.mutate(item)
        handleClose()
    }

    return (
        <React.Fragment>
            <Button variant="text" color="error" onClick={handleClickOpen}>
                DELETE
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Are you sure you want to delete {item.name}?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This will delete ${item.name} permanantly. Please make sure you want to
                        delete this item.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
