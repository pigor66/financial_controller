/**
 * Página de criação de nova transação
 */

'use client';

import * as React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    MenuItem,
    Alert,
    Grid2 as Grid,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TransactionFormData, TransactionType, TransactionCategory, PaymentStatus } from '@/shared/types';
import { CATEGORY_LABELS, TYPE_LABELS, STATUS_LABELS, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/shared/constants';

export default function NewTransactionPage() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState(false);
    const [customCategory, setCustomCategory] = React.useState('');

    const [formData, setFormData] = React.useState<TransactionFormData>({
        description: '',
        amount: 0,
        type: TransactionType.EXPENSE,
        category: TransactionCategory.OUTROS_GASTOS,
        date: new Date().toISOString().split('T')[0],
        status: PaymentStatus.PAID,
    });

    const handleChange = (field: keyof TransactionFormData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = field === 'amount' ? parseFloat(e.target.value) || 0 : e.target.value;
        setFormData({ ...formData, [field]: value });

        // Se mudar o tipo, ajusta a categoria padrão
        if (field === 'type') {
            const newType = value as TransactionType;
            const defaultCategory = newType === TransactionType.INCOME
                ? TransactionCategory.OUTROS_GANHOS
                : TransactionCategory.OUTROS_GASTOS;
            setFormData({ ...formData, type: newType, category: defaultCategory });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.description || formData.amount <= 0) {
            setError('Preencha todos os campos corretamente');
            return;
        }

        // Se a categoria for "OUTRO" e o campo customizado estiver vazio
        if (formData.category === TransactionCategory.OUTRO && !customCategory.trim()) {
            setError('Por favor, especifique a categoria personalizada');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // Se for categoria "OUTRO", adiciona a categoria personalizada na descrição
            const finalFormData = { ...formData };
            if (formData.category === TransactionCategory.OUTRO && customCategory.trim()) {
                finalFormData.description = `${customCategory.trim()} - ${formData.description}`;
            }

            const response = await fetch('/api/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalFormData),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                setTimeout(() => router.push('/transactions'), 1500);
            } else {
                setError(data.error || 'Erro ao criar transação');
            }
        } catch (err) {
            setError('Erro ao conectar com o servidor');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const availableCategories = formData.type === TransactionType.INCOME
        ? INCOME_CATEGORIES
        : EXPENSE_CATEGORIES;

    return (
        <DashboardLayout>
            <Box>
                <Typography variant="h4" gutterBottom fontWeight={600} sx={{ color: '#ffffff' }}>
                    Nova Transação
                </Typography>
                <Typography variant="body2" sx={{ color: '#b0b0b0' }} gutterBottom>
                    Registre uma nova receita ou despesa
                </Typography>

                <Card sx={{
                    mt: 3,
                    maxWidth: 600,
                    backgroundColor: '#212121',
                    border: '1px solid #333333',
                    borderRadius: 2
                }}>
                    <CardContent>
                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        {success && (
                            <Alert severity="success" sx={{ mb: 3 }}>
                                Transação criada com sucesso! Redirecionando...
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        label="Descrição"
                                        value={formData.description}
                                        onChange={handleChange('description')}
                                        required
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Tipo"
                                        value={formData.type}
                                        onChange={handleChange('type')}
                                        required
                                    >
                                        {Object.values(TransactionType).map((type) => (
                                            <MenuItem key={type} value={type}>
                                                {TYPE_LABELS[type]}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="Valor"
                                        value={formData.amount || ''}
                                        onChange={handleChange('amount')}
                                        required
                                        inputProps={{ min: 0, step: 0.01 }}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Categoria"
                                        value={formData.category}
                                        onChange={handleChange('category')}
                                        required
                                    >
                                        {availableCategories.map((category) => (
                                            <MenuItem key={category} value={category}>
                                                {CATEGORY_LABELS[category]}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                {/* Campo de categoria customizada - aparece quando "Outro" é selecionado */}
                                {formData.category === TransactionCategory.OUTRO && (
                                    <Grid size={{ xs: 12 }}>
                                        <TextField
                                            fullWidth
                                            label="Nome da Categoria"
                                            value={customCategory}
                                            onChange={(e) => setCustomCategory(e.target.value)}
                                            required
                                            placeholder="Ex: Jardinagem, Presentes, etc."
                                            helperText="Especifique o nome da categoria personalizada"
                                        />
                                    </Grid>
                                )}

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        label="Data"
                                        value={formData.date}
                                        onChange={handleChange('date')}
                                        required
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Status"
                                        value={formData.status}
                                        onChange={handleChange('status')}
                                        required
                                    >
                                        {Object.values(PaymentStatus).map((status) => (
                                            <MenuItem key={status} value={status}>
                                                {STATUS_LABELS[status]}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                        <Button
                                            variant="outlined"
                                            onClick={() => router.push('/transactions')}
                                            disabled={loading}
                                            sx={{
                                                borderColor: '#ff4444',
                                                color: '#ff4444',
                                                '&:hover': {
                                                    borderColor: '#cc0000',
                                                    backgroundColor: 'rgba(255, 68, 68, 0.1)'
                                                }
                                            }}
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disabled={loading}
                                            sx={{
                                                backgroundColor: '#ff4444',
                                                '&:hover': {
                                                    backgroundColor: '#cc0000',
                                                }
                                            }}
                                        >
                                            {loading ? 'Salvando...' : 'Salvar Transação'}
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </DashboardLayout>
    );
}

