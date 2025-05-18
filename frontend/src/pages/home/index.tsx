import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../../components/views/Sidebar/sidebar'
import Button from '../../components/ui/button'
import { tableHeaders } from '../../constants/table-header'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import type { EmployeeLaptop } from '../../types'
import Pagination from '../../components/ui/pagination'
import { AlertDialog, TextField } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import api from '../../helpers/api'
import { useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'

type Props = {}


const EmployeeSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  nationalIdentity: z.string().min(1),
  telephone: z.string().min(1),
  email: z.string().email(),
  department: z.string().min(1),
  position: z.string().min(1),
  laptopManufacturer: z.string().min(1),
  model: z.string().min(1),
  serialNumber: z.string().min(1)
})

export type EmployeeFormData = z.infer<typeof EmployeeSchema>

function HomePage({ }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [employees, setEmployees] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const rowsPerPage = 10;
  const currentPage = parseInt(searchParams.get('page') || '1');
  const formRef = useRef(null)

  useEffect(() => {
    window.addEventListener('click', e => {
      if (e.target !== formRef.current && dialogOpen) {
        setDialogOpen(false)
      }
    })
  }, [])

  useEffect(() => {
    const getEmployees = async () => {
      const response = await api.GET(`/employees?page=${currentPage}&pageSize=${rowsPerPage}`);
      if (response.employees) {
        setEmployees(response.employees);
        setTotalCount(response.count);
      }
    };

    getEmployees();
  }, [currentPage]); // Re-fetch when page changes

  const totalPages = Math.ceil(totalCount / rowsPerPage);

  const handlePageChange = (newPage: number) => {
    // Update URL search params
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
  };

  const paginatedEmployees = employees.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(EmployeeSchema)
  })

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      const res = await api.POST('/employees', data)
      if (!res.status) return toast.error(res.message)
      toast.success('employee added successfully')
      setDialogOpen(false)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className='bg-[var(--background)] w-full min-h-screen flex '>
      <Sidebar />

      <div className='grow flex flex-col gap-3 px-2'>

        <div ref={formRef} className='mt-5 flex justify-end '>
          <AlertDialog.Root open={dialogOpen}>
            <AlertDialog.Trigger>
              <Button onClick={() => setDialogOpen(true)} variant='primary'>Add employee</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content className="p-4 bg-white rounded shadow-md w-[500px]">
              <AlertDialog.Title className="text-lg font-semibold mb-2">Add an employee</AlertDialog.Title>
              <form onSubmit={handleSubmit(onSubmit)} className="gap-3 grid grid-cols-2">
                {[
                  ['firstName', 'First name'],
                  ['lastName', 'Last name'],
                  ['nationalIdentity', 'National Identity'],
                  ['telephone', 'Telephone'],
                  ['email', 'Email'],
                  ['department', 'Department'],
                  ['position', 'Position'],
                  ['laptopManufacturer', 'Laptop Manufacturer'],
                  ['model', 'Model'],
                  ['serialNumber', 'Serial Number']
                ].map(([name, label]) => (
                  <div key={name} className="flex flex-col">
                    <TextField.Root
                      placeholder={`Enter ${label.toLowerCase()}`}
                      className="w-full"
                      {...register(name as keyof EmployeeFormData)}
                    />
                    {errors[name as keyof EmployeeFormData] && (
                      <span className="text-red-500 text-sm">* {label} is required</span>
                    )}
                  </div>
                ))}

                <Button type="submit" className='w-full' variant='primary'>Add</Button>
                <AlertDialog.Cancel>
                  <Button onClick={() => setDialogOpen(false)} variant="outline">Cancel</Button>
                </AlertDialog.Cancel>
              </form>
            </AlertDialog.Content>
          </AlertDialog.Root>
        </div>
        <div className='w-full p-2 bg-white mt-5 rounded-md'>

          <Table className='border border-[var(--background)] rounded-md'>
            <TableHeader className='rounded-md border border-[var(--background)]'>
              <TableRow>
                {
                  tableHeaders.map(header => {
                    return (
                      <TableHead key={header}>{header}</TableHead>
                    )
                  })
                }
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedEmployees.map((employee: EmployeeLaptop) => (
                <TableRow className='cursor-pointer border border-[var(--background)] hover:bg-[var(--background)]' key={employee.id}>
                  <TableCell className='font-bold'>{employee.id}</TableCell>
                  <TableCell>{employee.firstname}</TableCell>
                  <TableCell>{employee.lastname}</TableCell>
                  <TableCell>{employee.nationalIdentity}</TableCell>
                  <TableCell>{employee.telephone}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.laptopManufacturer}</TableCell>
                  <TableCell>{employee.model}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage