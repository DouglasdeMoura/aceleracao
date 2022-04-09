import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { App } from './app'

describe('<App />', () => {
  it('deve incrementar o contador', async () => {
    render(<App />)

    const button = screen.getByTestId('counter')
    userEvent.click(button)

    await waitFor(() => expect(button).toHaveTextContent('Contador: 1'))
  })

  it('deve adicionar uma tarefa', async () => {
    render(<App />)
    const task = 'Nova tarefa'

    await userEvent.type(screen.getByLabelText('Nova tarefa:'), task)
    userEvent.click(screen.getByText('Adicionar'))

    await waitFor(() => {
      expect(screen.getByText(task)).toBeInTheDocument()
    })
  })
})
