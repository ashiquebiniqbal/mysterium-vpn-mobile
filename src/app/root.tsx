import TequilapiClientFactory from 'mysterium-tequilapi'
import { Root as RootBase } from 'native-base'
import * as React from 'react'
import { CONFIG } from '../config'
import { FavoritesStorage } from '../libraries/favorites-storage'
import TequilApiDriver from '../libraries/tequil-api/tequil-api-driver'
import TequilApiState from '../libraries/tequil-api/tequil-api-state'
import ProposalsAdapter from './adapters/proposals-adapter'
import App from './app'
import AppLoader from './app-loader'
import Connection from './core/connection'
import Logger from './logger'
import MessageDisplayDelegate from './messages/message-display-delegate'
import Favorites from './proposals/favorites'
import ProposalList from './proposals/proposal-list'
import ConnectionStore from './stores/connection-store'
import ProposalsStore from './stores/proposals-store'
import VpnAppState from './vpn-app-state'

class Root extends React.PureComponent {
  private readonly api = new TequilapiClientFactory(CONFIG.TEQUILAPI_ADDRESS, CONFIG.TEQUILAPI_TIMEOUT).build()
  private readonly tequilApiState = new TequilApiState()
  private readonly vpnAppState = new VpnAppState()
  private readonly messageDisplayDelegate = new MessageDisplayDelegate()
  private readonly favoritesStore = new FavoritesStorage()
  private readonly connection = new Connection(this.api, this.tequilApiState)
  private readonly connectionStore = new ConnectionStore(this.connection)
  private readonly proposalsAdapter = new ProposalsAdapter(this.api)
  private readonly proposalsStore = new ProposalsStore(this.proposalsAdapter)
  private readonly tequilAPIDriver =
    new TequilApiDriver(this.api, this.tequilApiState, this.connection, this.messageDisplayDelegate)
  private readonly proposalList = new ProposalList(this.proposalsStore, this.favoritesStore)
  private readonly favorites = new Favorites(this.favoritesStore)
  private readonly appLoader = new AppLoader(this.tequilAPIDriver, this.connection, this.proposalsStore)

  public async componentWillMount () {
    const logger = new Logger(this.tequilApiState, this.vpnAppState, this.connection, this.proposalsStore)
    logger.logObservableChanges()
    await this.favoritesStore.fetch()
  }

  public render () {
    return (
      <RootBase>
        <App
          tequilAPIDriver={this.tequilAPIDriver}
          connectionStore={this.connectionStore}
          vpnAppState={this.vpnAppState}
          messageDisplayDelegate={this.messageDisplayDelegate}
          proposalList={this.proposalList}
          favorites={this.favorites}
          appLoader={this.appLoader}
        />
      </RootBase>
    )
  }
}

export default Root
