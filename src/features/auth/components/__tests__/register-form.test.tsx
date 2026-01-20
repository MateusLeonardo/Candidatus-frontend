import { render, screen, waitFor } from "@/test/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RegisterForm } from "../register-form";
import * as mutationRegisterUserModule from '../../hooks/mutation-register-user'
import userEvent from "@testing-library/user-event";

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
    }),
    Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
        <a href={href}>{children}</a>
    ),
}))

vi.mock('../../hooks/mutation-register-user', () => ({
    mutationRegisterUser: vi.fn(),
}))

vi.mock('@/hooks/use-toast', () => ({
    useToastError: vi.fn(),
    useToastSuccess: vi.fn(),
}))

vi.mock('js-cookie', () => ({
    set: vi.fn(),
    get: vi.fn(),
    remove: vi.fn(),
}))

describe('RegisterForm', () => {
    const mockMutate = vi.fn()
    const mockMutation = {
        mutate: mockMutate,
        isPending: false,
    }

    beforeEach(() => {
        vi.clearAllMocks()
        vi.mocked(mutationRegisterUserModule.mutationRegisterUser).mockReturnValue(
            mockMutation as any
        )
    })

    it('deve renderizar o formulário de registro corretamente', () => {
        render(<RegisterForm />)

        const registerElements = screen.getAllByText(/registrar/i)
        const inputEmail = screen.getByLabelText(/e-mail/i)
        const inputPassword = screen.getByLabelText(/^Senha$/i)
        const inputConfirmPassword = screen.getByLabelText(/^Confirmar Senha$/i)
        const buttonSubmit = screen.getByRole('button', { name: /registrar/i })

        expect(registerElements.length).toBe(3)
        expect(inputEmail).toBeInTheDocument()
        expect(inputPassword).toBeInTheDocument()
        expect(inputConfirmPassword).toBeInTheDocument()
        expect(buttonSubmit).toBeInTheDocument()
    })

    it('deve mostrar link para login', () => {
        render(<RegisterForm />)

        const loginLink = screen.getByRole('link', { name: /entrar/i })

        expect(loginLink).toBeInTheDocument()
        expect(loginLink).toHaveAttribute('href', '/login')
    })

    it('deve retornar erro caso email seja inválido', async () => {
        const user = userEvent.setup();

        render(<RegisterForm />)

        const inputEmail = screen.getByLabelText(/e-mail/i)
        const inputPassword = screen.getByLabelText(/^Senha$/i)
        const inputConfirmPassword = screen.getByLabelText(/^Confirmar Senha$/i)
        const buttonSubmit = screen.getByRole('button', { name: /registrar/i })

        await user.type(inputEmail, 'email-invalido')
        await user.type(inputPassword, 'senha123')
        await user.type(inputConfirmPassword, 'senha123')
        await user.click(buttonSubmit)

        await waitFor(() => {
            expect(mockMutate).not.toHaveBeenCalled()
            expect(screen.getByText('Digite um e-mail válido')).toBeInTheDocument()
        })
    })

    it('deve retornar erro caso senha seja inválida', async () => {
        const user = userEvent.setup();

        render(<RegisterForm />)

        const inputEmail = screen.getByLabelText(/e-mail/i)
        const inputPassword = screen.getByLabelText(/^Senha$/i)
        const inputConfirmPassword = screen.getByLabelText(/^Confirmar Senha$/i)
        const buttonSubmit = screen.getByRole('button', { name: /registrar/i })

        await user.type(inputEmail, 'teste@example.com')
        await user.type(inputPassword, '123')
        await user.type(inputConfirmPassword, '123')
        await user.click(buttonSubmit)

        await waitFor(() => {
            expect(mockMutate).not.toHaveBeenCalled()
            expect(screen.getAllByText('A senha deve ter pelo menos 6 caracteres').length).toBeGreaterThanOrEqual(2);
        })
    })

    it('deve retornar erro caso senhas não conferem', async () => {
        const user = userEvent.setup();

        render(<RegisterForm />)

        const inputEmail = screen.getByLabelText(/e-mail/i)
        const inputPassword = screen.getByLabelText(/^Senha$/i)
        const inputConfirmPassword = screen.getByLabelText(/^Confirmar Senha$/i)
        const buttonSubmit = screen.getByRole('button', { name: /registrar/i })

        await user.type(inputEmail, 'teste@example.com')
        await user.type(inputPassword, '123456')
        await user.type(inputConfirmPassword, '1234567')
        await user.click(buttonSubmit)

        await waitFor(() => {
            expect(mockMutate).not.toHaveBeenCalled()
            expect(screen.getByText('As senhas não conferem')).toBeInTheDocument();
        })
    })
})