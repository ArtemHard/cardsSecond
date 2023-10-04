import { ComponentPropsWithoutRef } from 'react'

import { Card } from '../../ui/card'
import { Typography } from '../../ui/Typography'

import style from './test-accountInfo.module.scss'

export const TestAccountInfo = ({ className, ...restProps }: ComponentPropsWithoutRef<'div'>) => {
  return (
    <Card className={style.root + ' ' + className} {...restProps}>
      <div>
        <div>
          <Typography as="span" variant="subtitle1">
            Login:{' '}
            <Typography as="span" variant="body2">
              test@test.com
            </Typography>
          </Typography>
        </div>
        <div>
          <Typography as="span" variant="subtitle1">
            Password:{' '}
            <Typography as="span" variant="body2">
              test
            </Typography>
          </Typography>
        </div>
      </div>
    </Card>
  )
}
