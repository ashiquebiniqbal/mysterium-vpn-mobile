/*
 * Copyright (C) 2018 The 'mysteriumnetwork/mysterium-vpn-mobile' Authors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { ConnectionStatusDTO } from 'mysterium-tequilapi'
import IConnectionAdapter from '../../../src/app/adapters/connection-adapter'
import ConnectionStatistics from '../../../src/app/models/connection-statistics'
import ConnectionStatus from '../../../src/app/models/connection-status'
import Ip from '../../../src/app/models/ip'

export class MockConnectionAdapter implements IConnectionAdapter {
  public mockStatus: ConnectionStatus = 'Connected'

  public async connect (_consumerId: string, _providerId: string) {
    // empty mock
  }

  public async disconnect () {
    // empty mock
  }

  public async fetchStatus (): Promise<ConnectionStatusDTO> {
    return { status: this.mockStatus }
  }

  public async fetchStatistics (): Promise<ConnectionStatistics> {
    return {
      duration: 1,
      bytesReceived: 1,
      bytesSent: 1
    }
  }

  public async fetchIp (): Promise<Ip> {
    return '100.101.102.103'
  }
}
