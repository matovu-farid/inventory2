export default function toCurrency(value: number) {
    return new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX' }).format(value)
}
