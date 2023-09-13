import { useEffect } from 'react'

import { selectorVerifyEmail } from '../../app/app.selectors'
import { appActions } from '../../app/app.slice'
import { useAppSelector } from '../../app/store'
import { CheckEmail } from '../../components/auth/check-email-form'
import { useActions } from '../../services/common/useActions'

export const CheckEmailPage = () => {
  const { updateEmail } = useActions(appActions)
  const email = useAppSelector(selectorVerifyEmail)

  useEffect(() => {
    return () => {
      updateEmail(null)
    }
  }, [])

  return <CheckEmail email={email ?? ''} />
}
