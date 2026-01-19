<?php

namespace App\Filament\Resources;

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Filament\Resources\PaymentResource\Pages;
use App\Models\Payment;
use App\Services\DeliveryService;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\Action;

class PaymentResource extends Resource
{
    protected static ?string $model = Payment::class;
    protected static ?string $navigationIcon = 'heroicon-o-credit-card';

    public static function form(Forms\Form $form): Forms\Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('order_id')->disabled(),
                Forms\Components\TextInput::make('method')->disabled(),
                Forms\Components\TextInput::make('status')->disabled(),
                Forms\Components\TextInput::make('amount')->disabled(),
            ]);
    }

    public static function table(Tables\Table $table): Tables\Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('order.order_number')->label('Order'),
                Tables\Columns\TextColumn::make('method'),
                Tables\Columns\TextColumn::make('status'),
                Tables\Columns\TextColumn::make('amount'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Action::make('approve_manual')
                    ->label('Approve Manual')
                    ->requiresConfirmation()
                    ->visible(fn (Payment $record) => $record->method === 'manual' && $record->status === PaymentStatus::PENDING->value)
                    ->action(function (Payment $record) {
                        $record->update(['status' => PaymentStatus::SETTLED->value]);
                        $record->order->update(['status' => OrderStatus::PAID->value]);
                        app(DeliveryService::class)->createForOrder($record->order);
                    }),
                Action::make('reject_manual')
                    ->label('Reject Manual')
                    ->color('danger')
                    ->requiresConfirmation()
                    ->visible(fn (Payment $record) => $record->method === 'manual' && $record->status === PaymentStatus::PENDING->value)
                    ->action(function (Payment $record) {
                        $record->update(['status' => PaymentStatus::FAILED->value]);
                        $record->order->update(['status' => OrderStatus::EXPIRED->value]);
                        $record->manualProof?->update(['status' => 'rejected']);
                    }),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPayments::route('/'),
            'edit' => Pages\EditPayment::route('/{record}/edit'),
        ];
    }
}
