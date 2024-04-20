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
import InventoryItem from '@renderer/models/inventoryItem'
import Unit from '@renderer/models/unit'
import { useState } from 'react'
import { firebaseApp } from '@renderer/signals/firebaseApp'
import { useQuery } from '@tanstack/react-query'
import FirebaseStorage from '@renderer/storage/firebase'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const items = [
    new InventoryItem({
        name: 'Item 1',
        price: 100,
        amount: 10,
        unit: new Unit({ name: 'Unit 1', unitsPerPack: 10, id: '3232hjh' }),
        createdAt: new Date(),
        id: '13434gfgfg'
    }),
    new InventoryItem({
        name: 'Item 2',
        price: 100,
        amount: 10,
        unit: new Unit({ name: 'Unit 1', unitsPerPack: 10, id: '3232hjh' }),
        createdAt: new Date(),
        id: '45453434gfgfg'
    })
]
export default function InventoryTable() {
    const [open, setOpen] = useState(false)
    const [selectedUnitId, setSelectedUnitId] = useState<string>('')
    const {
        isError,
        isPending,
        data: units,
        error: unitError
    } = useQuery({ queryKey: ['units'], queryFn: () => firebaseApp.getUnits() })
    if (isError) {
        console.error(unitError)
    }

    return (
        <div className="p-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                        Inventory Item
                    </h1>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setOpen(true)
                            }}
                        >
                            Add Inventory Item
                        </Button>
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
                            <DialogContent className="grid gap-2" dividers>
                                <TextField id="outlined-basic" label="Name" variant="outlined" />
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedUnitId}
                                        label="Age"
                                        onChange={(e) => {
                                            setSelectedUnitId(e.target.value)
                                        }}
                                    >
                                        {isError && (
                                            <MenuItem value="">Error: {unitError.message}</MenuItem>
                                        )}
                                        {isPending && <MenuItem value="">Loading...</MenuItem>}
                                        {units?.map((unit) => (
                                            <MenuItem key={unit.id} value={unit.id}>
                                                {unit.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    autoFocus
                                    onClick={() => {
                                        setOpen(false)
                                    }}
                                >
                                    Save changes
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                        <table className="min-w-full border-separate border-spacing-0">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                                    >
                                        Unit
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                                    >
                                        Price
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                    >
                                        PricePerPack
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                    >
                                        NumberOfPacks
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                    >
                                        Total Price
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                                    >
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {items.map((item, itemIdx) => (
                                    <tr key={item.id}>
                                        <td
                                            className={classNames(
                                                itemIdx !== items.length - 1
                                                    ? 'border-b border-gray-200'
                                                    : '',
                                                'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                            )}
                                        >
                                            {item.name}
                                        </td>
                                        <td
                                            className={classNames(
                                                itemIdx !== items.length - 1
                                                    ? 'border-b border-gray-200'
                                                    : '',
                                                'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                                            )}
                                        >
                                            {item.unit.name}
                                        </td>
                                        <td
                                            className={classNames(
                                                itemIdx !== items.length - 1
                                                    ? 'border-b border-gray-200'
                                                    : '',
                                                'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell'
                                            )}
                                        >
                                            {item.price}
                                        </td>
                                        <td
                                            className={classNames(
                                                itemIdx !== items.length - 1
                                                    ? 'border-b border-gray-200'
                                                    : '',
                                                'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                                            )}
                                        >
                                            {item.unit.unitsPerPack}
                                        </td>
                                        <td
                                            className={classNames(
                                                itemIdx !== items.length - 1
                                                    ? 'border-b border-gray-200'
                                                    : '',
                                                'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                                            )}
                                        >
                                            {item.amount}
                                        </td>
                                        <td
                                            className={classNames(
                                                itemIdx !== items.length - 1
                                                    ? 'border-b border-gray-200'
                                                    : '',
                                                'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                                            )}
                                        >
                                            {item.amount * item.price}
                                        </td>
                                        <td
                                            className={classNames(
                                                itemIdx !== items.length - 1
                                                    ? 'border-b border-gray-200'
                                                    : '',
                                                'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                                            )}
                                        >
                                            <a
                                                href="#"
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit<span className="sr-only">, {item.name}</span>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
