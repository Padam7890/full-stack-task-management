import Link from 'next/link'
import React from 'react'

const BacktoLogin = () => {
  return (
    <div className="flex justify-center mt-4">
    <Link
      href="/signin"
      className="text-sm  underline dark:text-white"
    >
      Back to Login
    </Link>
  </div>  )
}

export default BacktoLogin