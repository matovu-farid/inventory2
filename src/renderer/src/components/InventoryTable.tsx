import { Button } from '@mui/material'
import { useState } from 'react'
import { firebaseApp } from '@renderer/signals/firebaseApp'
import { useQuery } from '@tanstack/react-query'
import AddItemDialog from './AddItemDialog'
import { HashLoader } from 'react-spinners'
import InventoryItem from '@renderer/models/inventoryItem'
import toCurrency from '@renderer/utils/toCurrency'
import DeleteButton from './DeleteButton'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function InventoryTable() {
    const [open, setOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<InventoryItem>()
    const {
        isError,
        isPending,
        data: items
    } = useQuery({ queryKey: ['inventoryItems'], queryFn: () => firebaseApp.getInventoryItems() })

    if (isPending) {
        return (
            <div className="w-full h-full min-h-[50vh] grid justify-center">
                <HashLoader
                    color={'#123abc'}
                    loading={true}
                    size={75}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="w-full h-full grid justify-center">Failed to load inventory items</div>
        )
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
                        {selectedItem ? (
                            <AddItemDialog
                                open={open}
                                setOpen={setOpen}
                                name={selectedItem.name}
                                unitId={selectedItem.unit.id}
                                numberOfPacks={selectedItem.amount.toString()}
                                price={selectedItem.price.toString()}
                            />
                        ) : (
                            <AddItemDialog open={open} setOpen={setOpen} />
                        )}
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
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                                    >
                                        <span className="sr-only">DELETE</span>
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
                                            {toCurrency(item.amount * item.price)}
                                        </td>
                                        <td
                                            className={classNames(
                                                itemIdx !== items.length - 1
                                                    ? 'border-b border-gray-200'
                                                    : '',
                                                'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                                            )}
                                        >
                                            <Button
                                                variant="text"
                                                onClick={() => {
                                                    setSelectedItem(item)
                                                    setOpen(true)
                                                }}
                                            >
                                                Edit<span className="sr-only">, {item.name}</span>
                                            </Button>
                                        </td>
                                        <td
                                            className={classNames(
                                                itemIdx !== items.length - 1
                                                    ? 'border-b border-gray-200'
                                                    : '',
                                                'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                                            )}
                                        >
                                            <DeleteButton item={item} />
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
