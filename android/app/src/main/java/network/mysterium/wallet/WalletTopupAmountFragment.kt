package network.mysterium.wallet

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import network.mysterium.MainApplication
import network.mysterium.ui.onChange
import network.mysterium.vpn.databinding.FragmentWalletTopupAmountBinding
import java.math.BigDecimal

class WalletTopupAmountFragment : Fragment() {

    private lateinit var viewModel: WalletTopupViewModel

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val binding = FragmentWalletTopupAmountBinding.inflate(inflater, container, false)
        viewModel = (requireActivity().application as MainApplication).appContainer.walletTopupViewModel
        binding.viewModel = viewModel
        binding.lifecycleOwner = this.activity

        binding.toolbar.setNavigationOnClickListener {
            requireActivity().onBackPressed()
        }
        binding.amount10.setOnClickListener {
            viewModel.topupAmount.value = BigDecimal(10)
        }
        binding.amount20.setOnClickListener {
            viewModel.topupAmount.value = BigDecimal(20)
        }
        binding.amount50.setOnClickListener {
            viewModel.topupAmount.value = BigDecimal(50)
        }
        binding.amountCustomEdit.onChange {
            viewModel.topupAmount.value = try {
                BigDecimal(it)
            } catch (e: NumberFormatException) {
                null
            }
        }

        binding.continueButton.setOnClickListener {
            val direction = WalletTopupAmountFragmentDirections.actionWalletTopupFragmentToWalletTopupSelectCurrencyFragment()
            findNavController().navigate(direction)
        }

        return binding.root
    }

}
