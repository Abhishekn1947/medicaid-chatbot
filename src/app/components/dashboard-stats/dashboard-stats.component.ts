// src/app/components/dashboard-stats/dashboard-stats.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-stats',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="stats-grid">
      <div class="stat-item" *ngFor="let stat of stats">
        <div class="stat-icon" [style.background-color]="stat.color">
          <mat-icon>{{stat.icon}}</mat-icon>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{stat.value}}</div>
          <div class="stat-label">{{stat.label}}</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 24px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-light);
      transition: all var(--animation-normal);
      position: relative;
      overflow: hidden;
      animation: fadeInScale 0.5s ease-out;
    }

    .stat-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      transition: left var(--animation-slow);
    }

    .stat-item:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-medium);
    }

    .stat-item:hover::before {
      left: 100%;
    }

    .stat-item:nth-child(1) {
      animation-delay: 0.1s;
    }

    .stat-item:nth-child(2) {
      animation-delay: 0.2s;
    }

    .stat-item:nth-child(3) {
      animation-delay: 0.3s;
    }

    .stat-item:nth-child(4) {
      animation-delay: 0.4s;
    }

    .stat-icon {
      width: 56px;
      height: 56px;
      border-radius: var(--border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
      position: relative;
      box-shadow: var(--shadow-light);
      transition: all var(--animation-normal);
    }

    .stat-icon::after {
      content: '';
      position: absolute;
      inset: -2px;
      background: conic-gradient(from 0deg, transparent, rgba(255,255,255,0.4), transparent);
      border-radius: inherit;
      z-index: -1;
      animation: iconGlow 3s linear infinite;
    }

    .stat-item:hover .stat-icon {
      transform: scale(1.1);
      box-shadow: var(--shadow-medium);
    }

    @keyframes iconGlow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .stat-icon mat-icon {
      font-size: 28px;
      width: 28px;
      height: 28px;
      z-index: 1;
    }

    .stat-content {
      flex: 1;
      z-index: 1;
    }

    .stat-number {
      font-size: 1rem;
      font-weight: 700;
      color: #333;
      line-height: 1.2;
      background: var(--primary-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 0.75rem;
      color: #000 !important;
      font-weight: 500;
      letter-spacing: 0.5px;
    }

    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .stat-item {
        padding: 20px;
        gap: 12px;
      }

      .stat-icon {
        width: 48px;
        height: 48px;
      }

      .stat-icon mat-icon {
        font-size: 24px;
        width: 24px;
        height: 24px;
      }

      .stat-number {
        font-size: 0.8rem;
      }

      .stat-label {
        font-size: 0.65rem;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .stat-item {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .stat-number {
        color: #ffffff;
      }

      .stat-label {
        color: #000 !important;
      }
    }
  `]
})
export class DashboardStatsComponent {
  stats = [
    {
      icon: 'chat',
      value: '1,847',
      label: 'Conversations Today',
      color: '#4CAF50',
      trend: '+12%'
    },
    {
      icon: 'trending_up',
      value: '96.8%',
      label: 'Resolution Rate',
      color: '#2196F3',
      trend: '+2.6%'
    },
    {
      icon: 'schedule',
      value: '1.8 min',
      label: 'Avg Response Time',
      color: '#FF9800',
      trend: '-0.5min'
    },
    {
      icon: 'language',
      value: '3',
      label: 'Languages Active',
      color: '#9C27B0',
      trend: 'EN, ES, FR'
    },
    {
      icon: 'support',
      value: '24/7',
      label: 'Service Availability',
      color: '#00BCD4',
      trend: 'Online'
    },
    {
      icon: 'verified_user',
      value: '99.9%',
      label: 'System Uptime',
      color: '#4CAF50',
      trend: 'Stable'
    }
  ];
}
