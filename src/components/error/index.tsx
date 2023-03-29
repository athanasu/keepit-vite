import { Badge, Flex, Text } from '@mantine/core'
import { Link, useRouteError } from 'react-router-dom'
import { RouteError } from '~/types'

export default function ErrorPage() {
  const error = useRouteError() as RouteError
  console.error(error)

  return (
    <Flex align={'center'} direction={'column'} justify={'center'} h={'100vh'}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <Badge color="red" variant="light" data-testid="total">
        Error: {error.statusText || error.message}
      </Badge>
      <br />
      <Text>
        <Link to="/">Go home</Link>
      </Text>
    </Flex>
  )
}
