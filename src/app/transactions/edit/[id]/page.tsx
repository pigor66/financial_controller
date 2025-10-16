/**
 * Página de edição de transação
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
import { useRouter, useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { TransactionFormData, TransactionType, TransactionCategory, Transaction, PaymentStatus } from '@/shared/types';
import { CATEGORY_LABELS, TYPE_LABELS, STATUS_LABELS, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/shared/constants';

export default function EditTransactionPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [loading, setLoading] = React.useState(true);
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState(false);

    const [formData, setFormData] = React.useState<TransactionFormData>({
        description: '',
        amount: 0,
        type: TransactionType.EXPENSE,
        category: TransactionCategory.OUTROS_GASTOS,
        date: new Date().toISOString().split('T')[0],
        status: PaymentStatus.PAID,
    });

    React.useEffect(() => {
        fetchTransaction();
    }, [id]);

    const fetchTransaction = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`/api/transactions/${id}`);
            const data = await response.json();

            if (data.success) {
                const transaction: Transaction = data.data;
                setFormData({
                    description: transaction.description,
                    amount: transaction.amount,
                    type: transaction.type,
                    category: transaction.category,
                    date: transaction.date.split('T')[0], // Remove time part
                    status: transaction.status || PaymentStatus.PAID, // Padrão PAID para compatibilidade
                });
            } else {
                setError(data.error || 'Erro ao carregar transação');
            }
        } catch (err) {
            setError('Erro ao conectar com o servidor');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

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

        try {
            setSaving(true);
            setError(null);

            const response = await fetch(`/api/transactions/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                setTimeout(() => router.push('/transactions'), 1500);
            } else {
                setError(data.error || 'Erro ao atualizar transação');
            }
        } catch (err) {
            setError('Erro ao conectar com o servidor');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const availableCategories = formData.type === TransactionType.INCOME
        ? INCOME_CATEGORIES
        : EXPENSE_CATEGORIES;

    if (loading) {
        return (
            <DashboardLayout>
                <LoadingSpinner message="Carregando transação..." />
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <Box>
                <Typography variant="h4" gutterBottom fontWeight={600}>
                    Editar Transação
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Atualize os dados da transação
                </Typography>

                <Card sx={{ mt: 3, maxWidth: 600 }}>
                    <CardContent>
                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        {success && (
                            <Alert severity="success" sx={{ mb: 3 }}>
                                Transação atualizada com sucesso! Redirecionando...
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
                                            disabled={saving}
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disabled={saving}
                                        >
                                            {saving ? 'Salvando...' : 'Salvar Alterações'}
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

