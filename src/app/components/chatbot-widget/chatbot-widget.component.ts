// src/app/components/chatbot-widget/chatbot-widget.component.ts
import { Component, OnDestroy, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ChatService, ChatMessage, ChatAction } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chatbot-widget',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  template: `
    <div class="chatbot-widget" [class.expanded]="isExpanded">
      <!-- Chat Toggle Button -->
      <button
        mat-fab
        class="chat-toggle"
        (click)="toggleChat()"
        [attr.aria-label]="isExpanded ? 'Close chat' : 'Open chat'">
        <mat-icon>{{isExpanded ? 'close' : 'chat'}}</mat-icon>
      </button>

      <!-- Chat Window -->
      <div class="chat-window" *ngIf="isExpanded">
        <!-- Chat Header -->
        <div class="chat-header">
          <div class="chat-title">
            <mat-icon>local_hospital</mat-icon>
            <span>Medicaid Assistant</span>
          </div>
          <div class="chat-controls">
            <mat-form-field appearance="outline" class="language-select">
              <mat-select [(value)]="selectedLanguage" (selectionChange)="changeLanguage($event.value)">
                <mat-option value="en">English</mat-option>
                <mat-option value="es">Español</mat-option>
                <mat-option value="fr">Français</mat-option>
              </mat-select>
            </mat-form-field>
            <button mat-icon-button (click)="clearChat()" title="Clear chat" class="refresh-btn">
              <mat-icon>refresh</mat-icon>
            </button>
          </div>
        </div>

        <!-- Chat Messages -->
        <div class="chat-messages" #messagesContainer>
          <div class="welcome-message" *ngIf="showWelcomeMessage">
            <mat-icon>emoji_people</mat-icon>
            <p>{{getWelcomeMessage()}}</p>
            <div class="quick-options">
              <button
                mat-stroked-button
                *ngFor="let option of quickOptions"
                (click)="sendQuickMessage(option.text)"
                class="quick-option">
                {{option.label}}
              </button>
            </div>
          </div>

          <div
            class="message"
            *ngFor="let message of messages; trackBy: trackMessage"
            [class.user-message]="message.isUser"
            [class.bot-message]="!message.isUser">

            <div class="message-avatar" *ngIf="!message.isUser">
              <mat-icon>android</mat-icon>
            </div>

            <div class="message-content">
              <div class="message-text" [innerHTML]="message.text"></div>
              <div class="message-time">{{message.timestamp | date:'short'}}</div>

              <!-- Action Buttons -->
              <div class="message-actions" *ngIf="message.actions && message.actions.length > 0">
                <button
                  mat-stroked-button
                  *ngFor="let action of message.actions"
                  (click)="handleAction(action)"
                  class="action-button">
                  {{action.label}}
                </button>
              </div>

              <!-- Escalation Options -->
              <div class="escalation-options" *ngIf="message.showEscalation">
                <p><strong>Need more help?</strong></p>
                <button mat-raised-button color="warn" (click)="escalateToHuman()">
                  <mat-icon>support</mat-icon>
                  Connect to Human Agent
                </button>
              </div>
            </div>

            <div class="message-avatar" *ngIf="message.isUser">
              <mat-icon>person</mat-icon>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div class="typing-indicator" *ngIf="isTyping">
            <div class="message bot-message">
              <div class="message-avatar">
                <mat-icon>android</mat-icon>
              </div>
              <div class="message-content">
                <div class="typing-container">
                  <span class="typing-text">Agent is typing</span>
                  <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Speech Recognition Status -->
          <div class="speech-status" *ngIf="isListening">
            <div class="message bot-message">
              <div class="message-avatar">
                <mat-icon>mic</mat-icon>
              </div>
              <div class="message-content">
                <div class="speech-indicator">
                  <span>{{speechStatus}}</span>
                  <div class="sound-waves">
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Input -->
        <div class="chat-input">
          <div class="input-container">
            <mat-form-field appearance="outline" class="message-input">
              <input
                #messageInput
                matInput
                [(ngModel)]="currentMessage"
                (keyup.enter)="sendMessage()"
                [placeholder]="getInputPlaceholder()"
                [disabled]="isTyping || isListening"
                (focus)="onInputFocus()"
                (blur)="onInputBlur()">
            </mat-form-field>

            <div class="input-actions">
              <!-- Microphone Button -->
              <button
                mat-icon-button
                class="mic-button"
                [class.recording]="isListening"
                (mousedown)="startSpeechRecording($event)"
                (mouseup)="stopSpeechRecording()"
                (mouseleave)="stopSpeechRecording()"
                (touchstart)="startSpeechRecording($event)"
                (touchend)="stopSpeechRecording()"
                [disabled]="isTyping"
                [title]="isListening ? 'Release to stop recording' : 'Hold to record voice input'">
                <mat-icon>{{isListening ? 'mic_off' : 'mic'}}</mat-icon>
              </button>

              <!-- Send Button -->
              <button
                mat-icon-button
                class="send-button"
                (click)="sendMessage()"
                [disabled]="!canSendMessage()"
                title="Send message">
                <mat-icon>send</mat-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chatbot-widget {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 1000;
    }

    .chat-toggle {
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease !important;
      border: none !important;
    }

    .chat-toggle:hover {
      transform: scale(1.05);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    }

    .chat-window {
      position: absolute;
      bottom: 70px;
      right: 0;
      width: 380px;
      height: 580px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transform-origin: bottom right;
      animation: chatOpen 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    @keyframes chatOpen {
      from {
        opacity: 0;
        transform: scale(0.9) translateY(10px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    .chat-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
    }

    .chat-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 600;
      font-size: 1rem;
    }

    .chat-title mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .chat-controls {
      display: flex;
      align-items: center;
      gap: 8px;
      position: relative;
    }

    .chat-controls button[mat-icon-button] {
      color: white !important;
      background: transparent !important;
      border: none !important;
      border-radius: 0 !important;
      width: 38px !important;
      height: 38px !important;
      line-height: 38px !important;
      transition: all 0.2s ease !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 0 !important;
    }

    .chat-controls button[mat-icon-button]:hover {
      background: transparent !important;
      transform: scale(1.1);
    }

    .refresh-btn {
      transform: translateY(0mm) !important;
    }

    .language-select {
      width: 100px;
      transform: translateY(0mm) !important;
    }

    .language-select ::ng-deep .mat-mdc-form-field {
      font-size: 0.85rem;
      line-height: 1.2;
    }

    .language-select ::ng-deep .mat-mdc-form-field-subscript-wrapper {
      display: none;
    }

    .language-select ::ng-deep .mat-mdc-text-field-wrapper {
      background: rgba(255, 255, 255, 0.25);
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .language-select ::ng-deep .mdc-text-field {
      height: 38px;
      padding: 0 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .language-select ::ng-deep .mat-mdc-select-value {
      color: white;
      font-weight: 500;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin: 0 auto;
    }

    .language-select ::ng-deep .mat-mdc-select-arrow {
      color: white;
      margin-left: auto;
    }

    .language-select ::ng-deep .mdc-text-field--focused .mat-mdc-text-field-wrapper {
      background: rgba(255, 255, 255, 0.35);
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      background: #f8f9fa;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .welcome-message {
      text-align: center;
      padding: 24px 16px;
      color: #6c757d;
    }

    .welcome-message mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #667eea;
      margin-bottom: 16px;
    }

    .welcome-message p {
      margin: 0 0 20px 0;
      line-height: 1.5;
      font-size: 0.95rem;
    }

    .quick-options {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .quick-option {
      padding: 10px 16px;
      border: 1px solid #667eea;
      background: white;
      color: #667eea;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .quick-option:hover {
      background: #667eea;
      color: white;
      transform: translateY(-1px);
    }

    .message {
      display: flex;
      gap: 10px;
      margin-bottom: 16px;
      align-items: flex-start;
    }

    .user-message {
      flex-direction: row-reverse;
    }

    .message-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #667eea;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 16px;
    }

    .user-message .message-avatar {
      background: #28a745;
    }

    .message-content {
      flex: 1;
      max-width: calc(100% - 50px);
    }

    .message-text {
      background: white;
      padding: 12px 16px;
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      line-height: 1.4;
      font-size: 0.9rem;
      color: #333;
      word-wrap: break-word;
      position: relative;
    }

    .user-message .message-text {
      background: #667eea;
      color: white;
    }

    .message-time {
      font-size: 0.75rem;
      color: #adb5bd;
      margin-top: 6px;
      padding: 0 4px;
    }

    .user-message .message-time {
      text-align: right;
    }

    .message-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 10px;
    }

    .action-button {
      padding: 6px 12px !important;
      font-size: 0.85rem !important;
      border: 1px solid #667eea !important;
      color: #667eea !important;
      background: white !important;
      border-radius: 12px !important;
      transition: all 0.2s ease !important;
      min-height: auto !important;
      line-height: 1.2 !important;
    }

    .action-button:hover {
      background: #667eea !important;
      color: white !important;
      transform: translateY(-1px);
    }

    .escalation-options {
      margin-top: 12px;
      padding: 12px;
      background: #fff3cd;
      border: 1px solid #ffeaa7;
      border-radius: 8px;
    }

    .escalation-options p {
      margin: 0 0 8px 0;
      color: #856404;
      font-size: 0.85rem;
      font-weight: 500;
    }

    .escalation-options button {
      background: #dc3545 !important;
      color: white !important;
      font-size: 0.85rem !important;
      padding: 8px 16px !important;
      border-radius: 6px !important;
    }

    .typing-indicator {
      align-self: flex-start;
      animation: fadeIn 0.3s ease-in;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .typing-container {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      border: 1px solid rgba(102, 126, 234, 0.1);
      position: relative;
      overflow: hidden;
    }

    .typing-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.05), transparent);
      animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }

    .typing-text {
      font-size: 0.9rem;
      color: #667eea;
      font-weight: 500;
      font-style: italic;
      position: relative;
      z-index: 1;
    }

    .typing-dots {
      display: flex;
      gap: 3px;
      align-items: center;
      position: relative;
      z-index: 1;
    }

    .typing-dots span {
      width: 6px;
      height: 6px;
      background: #667eea;
      border-radius: 50%;
      animation: typingBounce 1.4s infinite ease-in-out;
      box-shadow: 0 1px 3px rgba(102, 126, 234, 0.3);
    }

    .typing-dots span:nth-child(1) { animation-delay: 0s; }
    .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
    .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes typingBounce {
      0%, 60%, 100% {
        transform: translateY(0) scale(1);
        opacity: 0.7;
        background: #adb5bd;
      }
      30% {
        transform: translateY(-8px) scale(1.2);
        opacity: 1;
        background: #667eea;
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
      }
    }

    .chat-input {
      padding: 16px;
      background: white;
      border-top: 1px solid #e9ecef;
      flex-shrink: 0;
    }

    /* Mobile Responsive */
    @media (max-width: 480px) {
      .chat-window {
        width: calc(100vw - 24px);
        height: calc(100vh - 120px);
        bottom: 80px;
        right: 12px;
        max-height: 600px;
      }

      .chat-header {
        padding: 14px 16px;
      }

      .chat-messages {
        padding: 12px;
      }

      .chat-input {
        padding: 12px;
      }

      .quick-options {
        gap: 6px;
      }

      .message-actions {
        flex-direction: column;
        gap: 4px;
      }

      .action-button {
        width: 100%;
        text-align: center;
      }
    }

    /* Speech Recognition Status */
    .speech-status {
      align-self: flex-start;
    }

    .speech-indicator {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      color: #667eea;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .sound-waves {
      display: flex;
      gap: 2px;
      align-items: center;
    }

    .wave {
      width: 3px;
      height: 12px;
      background: #667eea;
      border-radius: 2px;
      animation: soundWave 1.2s infinite ease-in-out;
    }

    .wave:nth-child(2) { animation-delay: 0.1s; }
    .wave:nth-child(3) { animation-delay: 0.2s; }

    @keyframes soundWave {
      0%, 40%, 100% {
        transform: scaleY(0.4);
        opacity: 0.5;
      }
      20% {
        transform: scaleY(1);
        opacity: 1;
      }
    }

    /* Input Container */
    .input-container {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
    }

    .input-actions {
      display: flex;
      gap: 8px;
      align-items: center;
      flex-shrink: 0;
    }

    .mic-button, .send-button {
      width: 44px !important;
      height: 44px !important;
      min-width: 44px !important;
      border-radius: 50% !important;
      padding: 0 !important;
      transition: all 0.3s ease !important;
    }

    .mic-button {
      background: #28a745 !important;
      color: white !important;
      box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
    }

    .mic-button:hover {
      background: #218838 !important;
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);
    }

    .mic-button.recording {
      background: #dc3545 !important;
      animation: pulse-red 1.5s infinite;
    }

    @keyframes pulse-red {
      0% {
        box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7);
      }
      70% {
        box-shadow: 0 0 0 8px rgba(220, 53, 69, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(220, 53, 69, 0);
      }
    }

    .mic-button.recording:hover {
      background: #c82333 !important;
    }

    .send-button {
      background: #667eea !important;
      color: white !important;
      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    }

    .send-button:hover:not(:disabled) {
      background: #5a67d8 !important;
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .send-button:disabled {
      background: #adb5bd !important;
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
    }

    .mic-button:disabled {
      background: #6c757d !important;
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
      animation: none !important;
    }

    /* Enhanced input styling */
    .message-input {
      flex: 1;
      min-height: 44px;
    }

    .message-input ::ng-deep .mat-mdc-form-field {
      width: 100%;
      height: 44px;
    }

    .message-input ::ng-deep .mat-mdc-text-field-wrapper {
      background: #f8f9fa;
      border-radius: 22px;
      border: 2px solid transparent;
      transition: all 0.3s ease;
      height: 44px;
      padding: 0;
    }

    .message-input ::ng-deep .mdc-text-field {
      height: 44px !important;
      border-radius: 22px;
    }

    .message-input ::ng-deep .mat-mdc-form-field-focus-overlay {
      background: transparent;
    }

    .message-input ::ng-deep .mdc-text-field--focused .mat-mdc-text-field-wrapper {
      border-color: #667eea;
      background: white;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .message-input ::ng-deep .mdc-text-field__input {
      padding: 0 20px !important;
      font-size: 0.95rem;
      line-height: 44px !important;
      height: 44px !important;
      border: none !important;
      outline: none !important;
      text-align: center !important;
      caret-color: #667eea;
      position: relative !important;
      top: -4.5mm !important;
    }

    .message-input ::ng-deep .mdc-text-field__input:focus,
    .message-input ::ng-deep .mdc-text-field__input:not(:placeholder-shown) {
      text-align: left !important;
    }

    .message-input ::ng-deep .mdc-text-field__input::placeholder {
      color: #adb5bd !important;
      font-size: 0.9rem !important;
      font-weight: 400 !important;
      opacity: 1 !important;
      text-align: center !important;
      transform: translateY(-3mm) !important;
      display: inline-block !important;
      position: relative !important;
      top: -3mm !important;
    }

    .message-input ::ng-deep .mdc-text-field__input:focus::placeholder {
      text-align: left !important;
      opacity: 0.6 !important;
      transform: translateY(-0mm) !important;
      top: -0mm !important;
    }

    .message-input ::ng-deep input:disabled {
      opacity: 0.7;
      background: #e9ecef;
    }

    .message-input ::ng-deep .mat-mdc-form-field-outline {
      display: none;
    }

    .message-input ::ng-deep .mat-mdc-form-field-subscript-wrapper {
      display: none;
    }

    .message-input ::ng-deep .mdc-text-field__input {
      align-self: center;
    }

    /* Accessibility improvements */
    .mic-button[title]:hover::after,
    .send-button[title]:hover::after {
      content: attr(title);
      position: absolute;
      top: -35px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 6px 10px;
      border-radius: 4px;
      font-size: 0.75rem;
      white-space: nowrap;
      z-index: 1001;
      pointer-events: none;
    }

    /* Enhanced error states */
    .message-input.error ::ng-deep .mat-mdc-form-field-flex {
      border-color: #dc3545 !important;
      background: #fff5f5;
    }

    .message-input.success ::ng-deep .mat-mdc-form-field-flex {
      border-color: #28a745 !important;
      background: #f8fff9;
    }

    /* Smooth scrollbar */
    .chat-messages::-webkit-scrollbar {
      width: 4px;
    }

    .chat-messages::-webkit-scrollbar-track {
      background: transparent;
    }

    .chat-messages::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 2px;
    }

    .chat-messages::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.3);
    }

    /* Enhanced responsive design for speech functionality */
    @media (max-width: 480px) {
      .input-container {
        gap: 6px;
      }

      .input-actions {
        gap: 6px;
      }

      .mic-button, .send-button {
        width: 40px !important;
        height: 40px !important;
        min-width: 40px !important;
      }

      .speech-indicator {
        padding: 10px 14px;
        font-size: 0.85rem;
      }

      .sound-waves .wave {
        width: 2px;
        height: 10px;
      }

      .typing-container {
        padding: 10px 14px;
        gap: 6px;
      }

      .typing-text {
        font-size: 0.85rem;
      }

      .typing-dots span {
        width: 5px;
        height: 5px;
      }
    }
  `]
})
export class ChatbotWidgetComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;

  // Component state
  isExpanded = false;
  currentMessage = '';
  selectedLanguage = 'en';
  isTyping = false;
  isListening = false;
  messages: ChatMessage[] = [];
  speechStatus = 'Listening...';
  showWelcomeMessage = true;

  // Speech recognition
  private recognition: any;
  private speechSupported = false;

  private subscriptions = new Subscription();

  quickOptions = [
    { label: 'Check Benefits', text: 'What are my benefits?' },
    { label: 'Find Provider', text: 'Find a doctor near me' },
    { label: 'Compare Plans', text: 'Help me choose an MCO' },
    { label: 'Get Help', text: 'I need human assistance' }
  ];

  constructor(
    private chatService: ChatService
  ) {
    this.initializeSpeechRecognition();
  }

  ngOnInit() {
    // Subscribe to chat messages
    this.subscriptions.add(
      this.chatService.messages$.subscribe(messages => {
        this.messages = messages;
        // Only hide welcome message when user sends their first actual message
        this.showWelcomeMessage = messages.length === 0 ||
          (messages.length === 1 && !messages[0].isUser);
        setTimeout(() => this.scrollToBottom(), 100);
      })
    );
  }

  ngAfterViewInit() {
    // Focus input when chat opens
    if (this.isExpanded) {
      this.focusInput();
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.stopSpeechRecognition();
  }

  // Speech Recognition Methods
  private initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      this.speechSupported = true;
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      this.recognition = new SpeechRecognition();

      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = this.getLanguageCode(this.selectedLanguage);

      this.recognition.onstart = () => {
        this.isListening = true;
        this.speechStatus = 'Listening...';
      };

      this.recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        this.currentMessage = transcript;
        this.speechStatus = 'Processing...';
      };

      this.recognition.onerror = (event: any) => {
        this.handleSpeechError(event.error);
      };

      this.recognition.onend = () => {
        if (this.isListening) {
          // Only stop if we're still meant to be listening (user clicked stop)
          this.isListening = false;
          if (this.currentMessage.trim()) {
            setTimeout(() => {
              this.sendMessage();
            }, 500); // Small delay to ensure final transcript is captured
          }
        }
      };
    }
  }

  private getLanguageCode(language: string): string {
    const languageCodes = {
      'en': 'en-US',
      'es': 'es-ES',
      'fr': 'fr-FR'
    };
    return languageCodes[language as keyof typeof languageCodes] || 'en-US';
  }

  private handleSpeechError(error: string) {
    this.isListening = false;
    let message = 'Speech recognition error occurred.';

    switch (error) {
      case 'network':
        message = 'Network error occurred during speech recognition.';
        break;
      case 'not-allowed':
        message = 'Microphone access denied. Please allow microphone access and try again.';
        break;
      case 'no-speech':
        message = 'No speech detected. Please try again.';
        break;
      case 'aborted':
        message = 'Speech recognition was aborted.';
        break;
    }

    this.showNotification(message);
  }

  startSpeechRecording(event: Event) {
    event.preventDefault();

    if (!this.speechSupported) {
      this.showNotification('Speech recognition is not supported in this browser.');
      return;
    }

    if (!this.isListening && !this.isTyping) {
      this.startSpeechRecognition();
    }
  }

  stopSpeechRecording() {
    if (this.isListening) {
      this.stopSpeechRecognition();
    }
  }

  private startSpeechRecognition() {
    try {
      this.currentMessage = ''; // Clear any existing message
      this.recognition.lang = this.getLanguageCode(this.selectedLanguage);
      this.recognition.start();
    } catch (error) {
      this.showNotification('Could not start speech recognition. Please try again.');
      this.isListening = false;
    }
  }

  private stopSpeechRecognition() {
    if (this.recognition && this.isListening) {
      this.isListening = false; // Set this first to prevent onend from firing
      this.recognition.stop();

      // Process any captured text
      if (this.currentMessage.trim()) {
        setTimeout(() => {
          this.sendMessage();
        }, 300);
      }
    }
  }

  // Chat Methods
  toggleChat() {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      // Focus input when chat opens - welcome message is handled by template
      setTimeout(() => this.focusInput(), 400);
    } else {
      this.stopSpeechRecognition();
    }
  }

  sendMessage() {
    if (!this.canSendMessage()) return;

    const message = this.currentMessage.trim();
    this.currentMessage = '';

    // Add user message
    this.chatService.addUserMessage(message);
    this.simulateRealisticTyping(message);

    this.focusInput();
  }

  sendQuickMessage(message: string) {
    this.currentMessage = message;
    this.sendMessage();
  }

  canSendMessage(): boolean {
    return !!(this.currentMessage.trim() && !this.isTyping && !this.isListening);
  }

  simulateTyping() {
    this.isTyping = true;
  }

  simulateRealisticTyping(userMessage: string) {
    this.isTyping = true;
    
    // Calculate realistic typing delay based on message complexity
    const baseDelay = 1000; // Base 1 second delay
    const wordCount = userMessage.split(' ').length;
    const complexityDelay = Math.min(wordCount * 100, 1000); // Up to 1 extra second for complex messages
    const randomDelay = Math.random() * 800; // Random 0-800ms for natural variation
    
    const totalDelay = baseDelay + complexityDelay + randomDelay;
    
    // Add a small initial delay to make it feel more natural
    setTimeout(() => {
      if (this.isTyping) {
        // Scroll to show typing indicator
        setTimeout(() => this.scrollToBottom(), 100);
      }
    }, 200);

    setTimeout(() => {
      if (this.isTyping) { // Check if typing wasn't cancelled
        this.isTyping = false;
        this.chatService.processMessage(userMessage, this.selectedLanguage);
        setTimeout(() => this.scrollToBottom(), 100);
      }
    }, totalDelay);
  }

  changeLanguage(language: string) {
    this.selectedLanguage = language;
    if (this.recognition) {
      this.recognition.lang = this.getLanguageCode(language);
    }
    this.chatService.addBotMessage(this.getLanguageChangeMessage(language));
  }

  clearChat() {
    this.stopSpeechRecognition();
    this.chatService.clearMessages();
    this.isTyping = false;
    this.showWelcomeMessage = true;
  }

  escalateToHuman() {
    this.chatService.addBotMessage(
      'I\'m connecting you with a human agent. Please hold while I transfer your case. Your conversation history will be shared with the agent.',
      ['escalation'],
      [],
      true
    );
  }

  handleAction(action: ChatAction) {
    if (!action) return;

    const userMessage = `Selected: ${action.label}`;
    this.chatService.addUserMessage(userMessage);
    this.simulateRealisticTyping(userMessage);
  }

  // Input Events
  onInputFocus() {
    setTimeout(() => this.scrollToBottom(), 100);
  }

  onInputBlur() {
    // Optional: Handle input blur
  }

  private focusInput() {
    if (this.messageInput && this.messageInput.nativeElement) {
      setTimeout(() => {
        this.messageInput.nativeElement.focus();
      }, 100);
    }
  }

  // Helper Methods
  getWelcomeMessage(): string {
    const messages = {
      en: 'Hello! I\'m your Medicaid Assistant. I can help you with benefits, find providers, compare plans, and answer questions about your coverage. How can I assist you today?',
      es: '¡Hola! Soy tu Asistente de Medicaid. Puedo ayudarte con beneficios, encontrar proveedores, comparar planes y responder preguntas sobre tu cobertura. ¿Cómo puedo asistirte hoy?',
      fr: 'Bonjour! Je suis votre Assistant Medicaid. Je peux vous aider avec les avantages, trouver des fournisseurs, comparer les plans et répondre aux questions sur votre couverture. Comment puis-je vous aider aujourd\'hui?'
    };
    return messages[this.selectedLanguage as keyof typeof messages] || messages.en;
  }

  getInputPlaceholder(): string {
    if (this.isListening) return 'Listening...';

    const placeholders = {
      en: 'Type your message or click mic to speak...',
      es: 'Escribe tu mensaje o haz clic en el micrófono...',
      fr: 'Tapez votre message ou cliquez sur le micro...'
    };
    return placeholders[this.selectedLanguage as keyof typeof placeholders] || placeholders.en;
  }

  getLanguageChangeMessage(language: string): string {
    const messages = {
      en: 'Language changed to English. How can I help you?',
      es: 'Idioma cambiado al español. ¿Cómo puedo ayudarte?',
      fr: 'Langue changée en français. Comment puis-je vous aider?'
    };
    return messages[language as keyof typeof messages] || messages.en;
  }

  trackMessage(_index: number, message: ChatMessage): string {
    return message.id;
  }

  private scrollToBottom() {
    if (this.messagesContainer && this.messagesContainer.nativeElement) {
      const container = this.messagesContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }

  private showNotification(message: string) {
    // Create a simple toast notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 24px;
      background: #dc3545;
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      z-index: 2000;
      animation: slideInRight 0.3s ease-out;
      max-width: 350px;
      font-size: 0.9rem;
      line-height: 1.4;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 4000);
  }
}
