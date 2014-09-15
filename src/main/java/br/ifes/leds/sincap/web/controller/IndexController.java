/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.ifes.leds.sincap.web.controller;

import br.ifes.leds.sincap.gerenciaNotificacao.cln.cdp.EstadoNotificacaoEnum;
import br.ifes.leds.sincap.gerenciaNotificacao.cln.cdp.ProcessoNotificacao;
import br.ifes.leds.sincap.gerenciaNotificacao.cln.cgt.AplProcessoNotificacao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.faces.bean.SessionScoped;
import java.util.List;

/**
 * Controla os eventos da página principal.
 *
 * @author Lucas Possatti
 */
@Controller
@RequestMapping(ContextUrls.INDEX)
@SessionScoped
public class IndexController {

    @Autowired
    AplProcessoNotificacao aplProcessoNotificacao;

    /**
     * Exibe a página principal.
     *
     * @param model
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public String index(ModelMap model) {
        // Puxa os três tipos de notificações corretamente da apl.
        List<ProcessoNotificacao> processosObitoAnalisePendente = aplProcessoNotificacao
                .retornarProcessoNotificacaoPorEstadoAtual(EstadoNotificacaoEnum.AGUARDANDOANALISEOBITO);
        List<ProcessoNotificacao> processosObitoAguardandoCorrecao = aplProcessoNotificacao
                .retornarProcessoNotificacaoPorEstadoAtual(EstadoNotificacaoEnum.AGUARDANDOCORRECAOOBITO);
        List<ProcessoNotificacao> processosEntrevistaAnalisePendente = aplProcessoNotificacao
                .retornarProcessoNotificacaoPorEstadoAtual(EstadoNotificacaoEnum.AGUARDANDOANALISEENTREVISTA);
        List<ProcessoNotificacao> processosCaptacoesAnalisePendente = aplProcessoNotificacao
                .retornarProcessoNotificacaoPorEstadoAtual(EstadoNotificacaoEnum.AGUARDANDOANALISECAPTACAO);
        List<ProcessoNotificacao> processosCaptacoesAguardandoCorrecao = aplProcessoNotificacao
                .retornarProcessoNotificacaoPorEstadoAtual(EstadoNotificacaoEnum.AGUARDANDOCORRECAOCAPTACACAO);

        // Adiciona as três listas de notificações à página.
        model.addAttribute("processosObitoAnalisePendente",
                processosObitoAnalisePendente);
        model.addAttribute("processosObitoAguardandoCorrecao",
                processosObitoAguardandoCorrecao);
        model.addAttribute("processosEntrevistaAnalisePendente",
                processosEntrevistaAnalisePendente);
        model.addAttribute("processosCaptacoesAnalisePendente",
                processosCaptacoesAnalisePendente);
        model.addAttribute("processosCaptacoesAguardandoCorrecao",
                processosCaptacoesAguardandoCorrecao);

        // Chama a página.
        return "index";
    }
}
