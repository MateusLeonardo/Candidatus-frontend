import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import { LoginForm } from '../login-form'
import * as mutationLoginModule from '../../hooks/mutation-login'

// Mock do next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

// Mock do hook de mutation
vi.mock('../../hooks/mutation-login', () => ({
  mutationLogin: vi.fn(),
}))

// Mock dos hooks de toast
vi.mock('@/hooks/use-toast', () => ({
  useToastError: vi.fn(),
  useToastSuccess: vi.fn(),
}))

// Mock do js-cookie
vi.mock('js-cookie', () => ({
  default: {
    set: vi.fn(),
    get: vi.fn(),
    remove: vi.fn(),
  },
}))

describe('LoginForm', () => {
  const mockMutate = vi.fn()
  const mockMutation = {
    mutate: mockMutate,
    isPending: false,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(mutationLoginModule.mutationLogin).mockReturnValue(
      mockMutation as any
    )
  })

  it('deve renderizar o formulário de login corretamente', () => {
    render(<LoginForm />)

    const entrarElements = screen.getAllByText(/entrar/i)
    expect(entrarElements.length).toBeGreaterThanOrEqual(2)

    expect(
      screen.getByText('Digite suas credenciais para acessar sua conta')
    ).toBeInTheDocument()
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
  })

  it('deve mostrar link para registro', () => {
    render(<LoginForm />)

    const registerLink = screen.getByRole('link', { name: /registrar/i })
    expect(registerLink).toBeInTheDocument()
    expect(registerLink).toHaveAttribute('href', '/registrar')
  })

  it('deve validar campos obrigatórios', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const submitButton = screen.getByRole('button', { name: /entrar/i })
    await user.click(submitButton)

    // O formulário deve impedir o submit se os campos estiverem vazios
    // A validação do Zod deve funcionar
    await waitFor(() => {
      expect(mockMutate).not.toHaveBeenCalled()
    })
  })

  it('deve validar formato de email', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const emailInput = screen.getByLabelText('E-mail')
    const passwordInput = screen.getByLabelText('Senha')
    const submitButton = screen.getByRole('button', { name: /entrar/i })

    await user.type(emailInput, 'email-invalido')
    await user.type(passwordInput, 'senha123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockMutate).not.toHaveBeenCalled()
    })
  })

  it('deve chamar mutation ao submeter formulário válido', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const emailInput = screen.getByLabelText('E-mail')
    const passwordInput = screen.getByLabelText('Senha')
    const submitButton = screen.getByRole('button', { name: /entrar/i })

    await user.type(emailInput, 'teste@example.com')
    await user.type(passwordInput, 'senha123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        email: 'teste@example.com',
        password: 'senha123',
      })
    })
  })

  it('deve desabilitar botão durante o carregamento', () => {
    const loadingMutation = {
      ...mockMutation,
      isPending: true,
    }

    vi.mocked(mutationLoginModule.mutationLogin).mockReturnValue(
      loadingMutation as any
    )

    render(<LoginForm />)

    const submitButton = screen.getByRole('button', { name: /entrando/i })
    expect(submitButton).toBeDisabled()
  })
})
