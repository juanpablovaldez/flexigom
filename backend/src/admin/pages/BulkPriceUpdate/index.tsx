import React, { useState, useEffect } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';
import {
  Box,
  Button,
  Typography,
  SingleSelect,
  SingleSelectOption,
  NumberInput,
  Flex,
  Alert,
  Field,
  MultiSelect,
  MultiSelectOption
} from '@strapi/design-system';

interface Product {
  id: string | number;
  documentId: string;
  name: string;
}

interface Category {
  id: string | number;
  attributes?: {
    name: string;
  };
  name?: string;
}

const BulkPriceUpdate = () => {
  const { get } = useFetchClient();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<string | number>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [adjustmentType, setAdjustmentType] = useState<string | number>('percentage');
  const [action, setAction] = useState<string | number>('increase');
  const [value, setValue] = useState<number | undefined>(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch categories to populate dropdown
    const fetchCategories = async () => {
      try {
        const { data } = await get('/content-manager/collection-types/api::category.category?pageSize=200');
        console.log('BulkPriceUpdate - Categories Raw Data:', data);
        
        if (data && data.results) {
          setCategories(data.results);
        } else if (data && data.data) {
          setCategories(data.data);
        } else {
          console.warn('BulkPriceUpdate - Unexpected data format:', data);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Error al cargar categorías. Revisa la consola para más detalles.');
      }
    };
    fetchCategories();
  }, [get]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryId) {
        setProducts([]);
        setSelectedProductIds([]);
        return;
      }
      try {
        const { data } = await get(`/content-manager/collection-types/api::product.product?filters[categories][id][$eq]=${categoryId}&pageSize=500`);
        if (data && data.results) {
          setProducts(data.results);
        } else if (data && data.data) {
          setProducts(data.data);
        }
        setSelectedProductIds([]); // Reset selection when category changes
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, [categoryId, get]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const token = sessionStorage.getItem('jwtToken') || localStorage.getItem('jwtToken');
      const res = await fetch('/api/products/bulk-price-update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token?.replace(/"/g, '')}`
        },
        body: JSON.stringify({
          categoryId,
          productIds: selectedProductIds,
          adjustmentType,
          action,
          value: Number(value)
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || data.message || 'Error updating prices');
      }

      setMessage(`¡Éxito! Precios actualizados. Productos afectados: ${data.affectedCount}`);
    } catch (err: any) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box padding={8} background="neutral100">
      <Box paddingBottom={4}>
        <Typography variant="alpha">Actualización Masiva de Precios</Typography>
        <Typography variant="epsilon">Ajusta los precios de una categoría de forma rápida.</Typography>
      </Box>

      {message && (
        <Box paddingBottom={4}>
          <Alert title="Éxito" variant="success" closeLabel="Cerrar" onClose={() => setMessage('')}>
            {message}
          </Alert>
        </Box>
      )}

      {error && (
        <Box paddingBottom={4}>
          <Alert title="Error" variant="danger" closeLabel="Cerrar" onClose={() => setError('')}>
            {error}
          </Alert>
        </Box>
      )}

      <Box background="neutral0" padding={6} shadow="filterShadow" hasRadius>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" alignItems="stretch" gap={4}>
             <Box>
                <Field.Root required>
                  <Field.Label>Categoría</Field.Label>
                  <SingleSelect
                    placeholder="Selecciona una categoría..."
                    value={categoryId}
                    onChange={setCategoryId}
                  >
                    {categories.map((cat) => (
                      <SingleSelectOption key={cat.id} value={cat.id}>
                        {cat.name || cat.attributes?.name}
                      </SingleSelectOption>
                    ))}
                  </SingleSelect>
                </Field.Root>
             </Box>

             <Box>
                <Field.Root>
                  <Field.Label>Productos específicos (Opcional - dejar vacío para toda la categoría)</Field.Label>
                  <MultiSelect
                    placeholder="Selecciona productos..."
                    onClear={() => setSelectedProductIds([])}
                    value={selectedProductIds}
                    onChange={setSelectedProductIds}
                    disabled={!categoryId}
                  >
                    {products.map((product) => (
                      <MultiSelectOption key={product.id} value={product.documentId}>
                        {product.name}
                      </MultiSelectOption>
                    ))}
                  </MultiSelect>
                </Field.Root>
             </Box>

             <Flex gap={4}>
               <Box flex={1}>
                 <Field.Root required>
                   <Field.Label>Tipo de ajuste</Field.Label>
                   <SingleSelect
                      value={adjustmentType}
                      onChange={setAdjustmentType}
                    >
                      <SingleSelectOption value="percentage">Porcentaje (%)</SingleSelectOption>
                      <SingleSelectOption value="fixed">Valor Fijo ($)</SingleSelectOption>
                   </SingleSelect>
                 </Field.Root>
               </Box>

               <Box flex={1}>
                 <Field.Root required>
                   <Field.Label>Acción</Field.Label>
                   <SingleSelect
                      value={action}
                      onChange={setAction}
                    >
                      <SingleSelectOption value="increase">Aumentar</SingleSelectOption>
                      <SingleSelectOption value="decrease">Disminuir</SingleSelectOption>
                      <SingleSelectOption value="replace" disabled={adjustmentType === 'percentage'}>Reemplazar</SingleSelectOption>
                   </SingleSelect>
                 </Field.Root>
               </Box>
             </Flex>

             <Box>
                <Field.Root required>
                  <Field.Label>Valor</Field.Label>
                  <NumberInput
                    name="value"
                    onValueChange={(val) => setValue(val)}
                    value={value}
                  />
                </Field.Root>
             </Box>

             <Box paddingTop={2}>
               <Button type="submit" loading={loading} disabled={!categoryId || value === undefined}>
                 Aplicar Cambios
               </Button>
             </Box>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default BulkPriceUpdate;
